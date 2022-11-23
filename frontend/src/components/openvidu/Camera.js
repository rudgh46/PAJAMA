import React, { Component } from "react";
import "./OpenVideo.css";
import { connect } from "react-redux";
import { setOvSession, setUserId, setCake, setMusic } from "../../modules/ovsessionSlice";
import "react-circular-progressbar/dist/styles.css";

import * as tf from "@tensorflow/tfjs";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import * as handdetection from "@tensorflow-models/hand-pose-detection";
tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
);

//rtk 관련코드
const mapStateToProps = (state) => ({
  ovsession: state.ovsession.value,
  uid: state.ovsession.userid,
  ovcake: state.ovsession.cake,
  ovmusic: state.ovsession.music,
});
const mapDispatchToProps = { setOvSession, setUserId, setCake, setMusic };

var publisher;
//모션캡처 온오프
let tracking = true;

let emo = document.querySelector("#emo");
let video = document.querySelector("#video");

let detector;

//모션관련 코드
let test_hand = 0; //손등 : 1, 손바닥 : 2, 손 안펴져있으면 : 0
let hand_timer = 0; //손 뒤집을때가지 시간
let hand_flip_cnt = 0; //손뒤집은횟수
let hand_cake_motion = 0; //케이크 모션 취할때의 카운트
//카운트 테스트
let motion_cnt = 0;
let motion_timer = 0;

//모션 타이머 길이
let hold_duration = 60;
let hand_flip_duration = 30;

const fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
}; // 각 keypoint(손가락)을 이어주는 연결을 표현하기 위함

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isMobile() {
  //mobile인지 확인
  return isAndroid() || isiOS();
}

//카메라 클래스
//class camera
class Camera extends Component {
  constructor(props) {
    super(props);
    this.video = document.querySelector("video");

    // this.video = document.getElementById("video"); //video id를 가진 HTML code의 element 가져옴
    this.canvas = document.getElementById("output");
    this.ctx = this.canvas.getContext("2d");

    this.drawResult = this.drawResult.bind(this);
    this.drawResults = this.drawResults.bind(this);
    this.drawCtx = this.drawCtx.bind(this);
    this.clearCtx = this.clearCtx.bind(this);
    this.drawEmoticon = this.drawEmoticon.bind(this);
    this.hand_motion = this.hand_motion.bind(this);
    this.hand_turn = this.hand_turn.bind(this);
    this.drawKeypoints = this.drawKeypoints.bind(this);
    this.drawPath = this.drawPath.bind(this);
    this.drawPoint = this.drawPoint.bind(this);
    this.createDetector = this.createDetector.bind(this);
    this.renderResult = this.renderResult.bind(this);
    this.renderPrediction = this.renderPrediction.bind(this);
    this.apps = this.apps.bind(this);
  }

  componentDidMount() {}
  componentDidUpdate() {}
  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   */
  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");
    }

    const $size = { width: 640, height: 480 }; //desktop용 사이즈
    const $m_size = { width: 360, height: 270 }; //mobile용 사이즈
    const videoConfig = {
      audio: false,
      video: {
        facingMode: "user",
        // Only setting the video to a specified size for large screen, on
        // mobile devices accept the default size.
        width: isMobile() ? $m_size.width : $size.width,
        height: isMobile() ? $m_size.height : $size.height,
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    this.video.srcObject = stream; //Webcam의 live stream을 video id 가진 HTML 코드의 video element에 할당

    await new Promise((resolve) => {
      this.video.onloadedmetadata = () => {
        resolve(video);
      };
    });

    this.video.play();

    const videoWidth = this.video.videoWidth;
    const videoHeight = this.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.
    this.video.width = videoWidth;
    this.video.height = videoHeight;
    //canvas는 나중에 detection result를 그리는데 사용 됨
    this.canvas.width = videoWidth; //videoWidth와 일치시켜 detection result가 video cam 위에 맵핑되도록 함
    this.canvas.height = videoHeight;
    const canvasContainer = document.querySelector(".canvas-wrapper");
    canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`; //css 부분도 video cam과 같은 크기로 할당

    // Because the image from camera is mirrored, need to flip horizontally.
    //기본적으로 camera가 mirroring 되어있으므로 horizontal flipping 함
    this.ctx.translate(this.video.videoWidth, 0);
    this.ctx.scale(-1, 1);

    return 1; //의미없음
  }

  //웹알티씨  비디오가 있으므로 비디오 그릴필요 없음!
  drawCtx() {
    // this.ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  /**
   * Draw the keypoints on the video.
   * @param hands A list of hands to render.
   */
  drawResults(hands) {
    // Sort by right to left hands.
    hands.sort((hand1, hand2) => {
      if (hand1.handedness < hand2.handedness) return 1;
      if (hand1.handedness > hand2.handedness) return -1;
      return 0;
    });

    // Pad hands to clear empty scatter GL plots.
    while (hands.length < 2) hands.push({});

    //내 비디오를 캔버스에 안 그리므로 잔상이 자꾸남아서 클리어
    this.clearCtx();

    for (let i = 0; i < hands.length; ++i) {
      this.drawResult(hands[i]); //detection된 모든 hand 모두에 대해
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param hand A hand with keypoints to render.
   * @param ctxt Scatter GL context to render 3D keypoints to.
   */

  drawResult(hand) {
    if (hand.keypoints != null) {
      this.drawKeypoints(hand.keypoints, hand.handedness);
      const emo_type = this.drawEmoticon(hand.keypoints); //keypoints를 parsing해서 emo_type을 반환한다.
      const mySession = this.props.ovsession;

      if (emo_type == "v") {
        //v포즈 취할 경우
        mySession.signal({
          data: `${this.props.uid},hand-v`,
          to: [],
          type: "motion",
        });
        // emo.innerHTML = '<img src="/v.jpg" width="300" height="300">';
      } else if (emo_type == "heart") {
        //손꾸락하트
        mySession.signal({
          data: `${this.props.uid},hand-heart`,
          to: [],
          type: "motion",
        });
        // console.log("하또");
        // emo.innerHTML = '<img src="/heart.gif" width="300" height="300">';
      } else if (emo_type == "test") {
        //confetti
        mySession.signal({
          data: `${this.props.uid},hand-flip`,
          to: [],
          type: "motion",
        });
        // emo.innerHTML = '<img src="/test.gif" width="300" height="300">';
      } else if (emo_type == "1") {
        //손가락 1
        mySession.signal({
          data: `${this.props.uid},hand-one`,
          to: [],
          type: "motion",
        });
        // emo.innerHTML = "1";
      } else if (emo_type == "cake_hand") {
        //케이크 끄기
        mySession.signal({
          data: `${this.props.uid},fire-off`,
          to: [],
          type: "motion",
          // type: "cakeshow",
        });
        // connect.log("케이크 보내고 현재상태는=========", this.props);
        // emo.innerHTML = "케이크 꺼짐";
      } else {
        //이외일 경우 아무것도 보여주지 않음
      }
    }
  }
  drawEmoticon(keypoints) {
    //손 모양 코드 y축, 위에서 아래로 값 커짐
    const keypointsArray = keypoints;

    const thumb_tip = keypointsArray[4].y;
    const thumb_ip = keypointsArray[3].y;
    const thumb_mcp = keypointsArray[2].y;
    const index_finger_tip = keypointsArray[8].y;
    const index_finger_pip = keypointsArray[6].y;
    const index_finger_mcp = keypointsArray[5].y;
    const middle_finger_tip = keypointsArray[12].y;
    const middle_finger_pip = keypointsArray[10].y;
    const middle_finger_mcp = keypointsArray[9].y;
    const ring_finger_tip = keypointsArray[16].y;
    const ring_finger_pip = keypointsArray[14].y;
    const ring_finger_mcp = keypointsArray[13].y;
    const pinky_finger_tip = keypointsArray[20].y;
    const pinky_finger_pip = keypointsArray[18].y;
    const pinky_finger_mcp = keypointsArray[17].y;

    const middle_finger_pip_x = keypointsArray[10].x;
    const index_finger_tip_x = keypointsArray[8].x;

    if (
      // v start
      thumb_tip > index_finger_mcp &&
      index_finger_tip < index_finger_pip &&
      middle_finger_tip < middle_finger_pip &&
      ring_finger_tip > middle_finger_pip &&
      ring_finger_pip < ring_finger_tip &&
      pinky_finger_tip > middle_finger_pip &&
      pinky_finger_pip < pinky_finger_tip &&
      thumb_tip < ring_finger_tip
    ) {
      return this.hand_motion(keypoints, "1"); //v end
    } else if (
      // 손꾸락 하트, 1 start
      thumb_tip < thumb_mcp &&
      index_finger_tip < index_finger_pip &&
      index_finger_pip < index_finger_mcp &&
      middle_finger_tip > middle_finger_pip &&
      // middle_finger_mcp < middle_finger_tip &&
      ring_finger_tip > ring_finger_pip &&
      // ring_finger_mcp < ring_finger_tip &&
      pinky_finger_tip > pinky_finger_pip &&
      // pinky_finger_mcp < pinky_finger_tip &&
      (middle_finger_pip_x < index_finger_tip_x || middle_finger_pip_x > index_finger_tip_x)
    ) {
      return this.hand_motion(keypoints, "2"); //손꾸락 하트, 1 end
    } else if (
      //손 세로로 펴진거 start
      thumb_tip < thumb_ip &&
      index_finger_tip < index_finger_pip &&
      middle_finger_tip < middle_finger_pip &&
      ring_finger_tip < ring_finger_pip &&
      pinky_finger_tip < pinky_finger_pip &&
      thumb_mcp > pinky_finger_tip
    ) {
      return this.hand_motion(keypoints, "3"); //손 세로로 펴진거 end
    } else if (
      //손 가로로 펴진거 start
      thumb_tip < thumb_ip &&
      index_finger_tip < middle_finger_tip &&
      middle_finger_tip < ring_finger_tip &&
      ring_finger_tip < pinky_finger_tip
    ) {
      return this.hand_motion(keypoints, "4"); //손 가로로 펴진거 end
    } else {
      //그외
      return "none";
    }
  }

  hand_motion(keypoints, type) {
    //손 모양 코드 x축
    const keypointsArray = keypoints;
    // for x axis
    const thumb_ip = keypointsArray[3].x;
    const thumb_tip = keypointsArray[4].x;
    const index_finger_mcp = keypointsArray[5].x;
    const index_finger_pip = keypointsArray[6].x;
    const index_finger_tip = keypointsArray[8].x;
    const middle_finger_pip = keypointsArray[10].x;
    const middle_finger_tip = keypointsArray[12].x;
    const ring_finger_pip = keypointsArray[14].x;
    const ring_finger_tip = keypointsArray[16].x;
    const pinky_finger_pip = keypointsArray[18].x;
    const pinky_finger_tip = keypointsArray[20].x;
    const timer_limit = 30;

    if (hand_flip_cnt >= 10) {
      hand_timer = 0;
      test_hand = 0;
      hand_flip_cnt = 0;
      // firework_timer = 100; //이거 양수이면 불꽃놀이 계속 보입니다
      return "test";
    }

    if (hand_cake_motion >= 3) {
      hand_timer = 0;
      test_hand = 0;
      hand_cake_motion = 0; // hand_flip_cnt = 0;
      motion_timer = 100;
      return "cake_hand";
    }

    if (
      //type 1 start
      (thumb_tip > index_finger_tip && thumb_tip < pinky_finger_pip) ||
      (thumb_tip < index_finger_tip && thumb_tip > pinky_finger_pip)
    ) {
      motion_cnt++;
      hand_timer = timer_limit;
      if (type == "1" && motion_cnt >= 30) {
        //브이 인식 너무 안되서 30으로 바꿨슴다
        motion_timer = 100;
        motion_cnt = 0;
        return "v";
      }
      if (type == "2" && motion_cnt >= 40) {
        motion_timer = 100;
        motion_cnt = 0;
        return "1";
      }
    } //type 1 end
    else if (
      //type 2 start
      (thumb_tip > index_finger_tip &&
        thumb_tip < index_finger_mcp &&
        thumb_ip - index_finger_pip < 20) ||
      (thumb_tip < index_finger_tip &&
        thumb_tip > index_finger_mcp &&
        index_finger_pip - thumb_ip < 20)
    ) {
      motion_cnt++;
      hand_timer = timer_limit;
      if (type == "2" && motion_cnt >= 40) {
        motion_timer = 100;
        motion_cnt = 0;
        return "heart";
      }
    } //type 2 end
    else if (
      //손바닥 세로로 펴져있을때
      //type 3 start
      ((thumb_tip < middle_finger_tip && middle_finger_tip < pinky_finger_tip) ||
        (thumb_tip > middle_finger_tip && middle_finger_tip > pinky_finger_tip)) &&
      type == "3"
    ) {
      return this.hand_turn(keypoints, "palm");
    } //type 3 end
    else if (
      //손바닥 가로로 펴져있을때
      //type 4 start
      // thumb_ip < thumb_tip &&
      ((index_finger_pip < index_finger_tip &&
        middle_finger_pip < middle_finger_tip &&
        ring_finger_pip < ring_finger_tip &&
        pinky_finger_pip < pinky_finger_tip) ||
        (index_finger_pip > index_finger_tip &&
          middle_finger_pip > middle_finger_tip &&
          ring_finger_pip > ring_finger_tip &&
          pinky_finger_pip > pinky_finger_tip)) &&
      type == "4"
    ) {
      return this.hand_turn(keypoints, "palm2");
    } //type 4 end
    else {
      //이더저도아닐때
      // if (firework_timer > 0) return "test";
      motion_cnt = 0;
      return "none";
    }
  }
  hand_turn(keypoints, check) {
    const keypointsArray = keypoints;
    const timer_limit = 30;

    const thumb_ip = keypointsArray[3].x;
    const thumb_tip = keypointsArray[4].x;
    const index_finger_pip = keypointsArray[6].x;
    const index_finger_tip = keypointsArray[8].x;
    const middle_finger_pip = keypointsArray[10].x;
    const middle_finger_tip = keypointsArray[12].x;
    const ring_finger_pip = keypointsArray[14].x;
    const ring_finger_tip = keypointsArray[16].x;
    const pinky_finger_mcp = keypointsArray[17].x;
    const pinky_finger_pip = keypointsArray[18].x;
    const pinky_finger_tip = keypointsArray[20].x;

    //손 흔들기 손바닥
    if (check == "palm" && thumb_ip < middle_finger_pip && middle_finger_pip < pinky_finger_mcp) {
      if (test_hand == 0) {
        hand_timer = timer_limit;
        test_hand = 1;
      } else if (test_hand == 2 && hand_timer > 0) {
        hand_timer = timer_limit;
        hand_flip_cnt++;
        test_hand = 1;
      }
    }

    //손 흔들기 손등
    if (check == "palm" && thumb_ip > middle_finger_pip && middle_finger_pip > pinky_finger_mcp) {
      if (test_hand == 0) {
        hand_timer = timer_limit;
        test_hand = 2;
      } else if (test_hand == 1 && hand_timer > 0) {
        hand_timer = timer_limit;
        hand_flip_cnt++;
        test_hand = 2;
      }
    }

    //cake끌때 손 흔들기 손바닥
    if (
      check == "palm2" &&
      // thumb_ip < thumb_tip &&
      index_finger_pip < index_finger_tip &&
      middle_finger_pip < middle_finger_tip &&
      ring_finger_pip < ring_finger_tip &&
      pinky_finger_pip < pinky_finger_tip &&
      middle_finger_tip > 320
    ) {
      if (test_hand == 0) {
        hand_timer = timer_limit;
        test_hand = 1;
      } else if (test_hand == 2 && hand_timer > 0) {
        hand_timer = timer_limit;
        hand_flip_cnt = 0;
        hand_cake_motion++;
        test_hand = 1;
      }
    }

    //cake끌때 손 흔들기 손등
    if (
      check == "palm2" &&
      // thumb_ip > thumb_tip &&
      index_finger_pip > index_finger_tip &&
      middle_finger_pip > middle_finger_tip &&
      ring_finger_pip > ring_finger_tip &&
      pinky_finger_pip > pinky_finger_tip &&
      middle_finger_tip < 320
    ) {
      if (test_hand == 0) {
        hand_timer = timer_limit;
        test_hand = 2;
      } else if (test_hand == 1 && hand_timer > 0) {
        hand_timer = timer_limit;
        hand_flip_cnt = 0;
        hand_cake_motion++;
        test_hand = 2;
      }
    }

    return "none";
  }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   * @param handedness Label of hand (either Left or Right).
   */
  drawKeypoints(keypoints, handedness) {
    const keypointsArray = keypoints;
    this.ctx.fillStyle = handedness === "Left" ? "Red" : "Blue"; //왼손, 오른손에 따라 색 구분
    this.ctx.strokeStyle = "White"; //keypoints를 이어주는 색을 흰색으로
    this.ctx.lineWidth = 2;

    for (let i = 0; i < keypointsArray.length; i++) {
      const y = keypointsArray[i].x;
      const x = keypointsArray[i].y;
      this.drawPoint(x - 2, y - 2, 3);
    }

    const fingers = Object.keys(fingerLookupIndices);
    for (let i = 0; i < fingers.length; i++) {
      const finger = fingers[i];
      const points = fingerLookupIndices[finger].map((idx) => keypoints[idx]); //기준 keypoint와 연결된 keypoint들을 맵핑
      this.drawPath(points, false);
    }
  }

  drawPath(points, closePath) {
    //hand keypoints끼리 연결된 경우 연결(path)을 시각화
    const region = new Path2D();
    region.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point.x, point.y); //points[0]과 연결된 points[1:]의 path를 그림
    }
    if (closePath) {
      region.closePath();
    }
    this.ctx.stroke(region);
  }

  drawPoint(y, x, r) {
    // hand keypoint(Point)을 시각화
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  //여기 아래로 클래스 밖에서 안으로 이식된 코드
  async createDetector() {
    const hands = handdetection.SupportedModels.MediaPipeHands; //MediaPipe에서 제공하는 hand pose detection model 사용
    return handdetection.createDetector(hands, {
      runtime: "tfjs", //runtime을 tfjs로 설정함에 따라 webGL을 default로 사용함
      modelType: "full", //full(큰 모델) or lite(작은 모델)
      maxHands: 1, // or 2~10 : detect 할 손의 개수
    });
  }

  async renderResult() {
    if (this.video.readyState < 2) {
      await new Promise((resolve) => {
        this.video.onloadeddata = () => {
          resolve(video);
        };
      });
    }

    let hands = null;

    if (detector != null) {
      try {
        hands = await detector.estimateHands(this.video, {
          flipHorizontal: false, //hand pose detection 결과를 hands에 반환
        });
      } catch (error) {
        detector.dispose(); //detector에 대한 tensor memory를 없앰
        detector = null;
        alert(error);
      }
    }

    //손바닥 뒤집기 타이머
    if (hand_timer > 0) {
      hand_timer--;
    } else if (hand_timer <= 0) {
      test_hand = 0;
      hand_flip_cnt = 0;
      hand_cake_motion = 0;
      hand_timer = 0;
      motion_cnt = 0;
    }
    // 모션 나오면 cnt 줄여서 없애기
    if (motion_timer > 0) {
      motion_timer--;
      if (motion_timer == 0) {
        emo.innerHTML = "<p></p>";
      }
    }

    // camera.drawCtx();

    if (hands && hands.length > 0 && tracking) {
      this.drawResults(hands); //detection 결과인 hands를 인자로 결과를 visualize 하는 drawResults 실행
    } else {
      this.clearCtx();
    }
  }

  async renderPrediction() {
    await this.renderResult();
    let rafId = requestAnimationFrame(this.renderPrediction); //실시간으로 renderPrediction을 계속 실행
  }

  async apps() {
    await this.setupCamera(); //webcam 셋팅
    console.log(tf.getBackend());
    detector = await this.createDetector(); //hand pose detection model 셋팅
    console.log(tf.getBackend()); //사용되는 TensorFlow.js backend 확인
    this.renderPrediction(); //detection을 통한 result를 draw
  }

  render() {
    this.apps();
    return <div></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
