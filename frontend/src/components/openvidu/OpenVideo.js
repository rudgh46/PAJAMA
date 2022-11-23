/*
index.html 에 있는 div id=emo 이거 필요합니다
ㄴ손 모션인식 시 움짤 출력하는 곳입니다

app.js에 이미지 경로 수정해야합니다(drawResult(hand))
 */
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, useEffect, useState, useRef } from "react";
import "./OpenVideo.css";
import UserVideoComponent from "./UserVideoComponent";
import Messages from "./Messages";
import FadeInOut from "../common/FadeInOut";
import Modal from "react-bootstrap/Modal";
import Camera from "./Camera";
import { connect } from "react-redux";
import { setOvSession, setUserId, setCake, setMusic } from "../../modules/ovsessionSlice";
import ReactDOM from "react-dom";
import { Popover, OverlayTrigger, Image } from "react-bootstrap";
import Speech from "./Speech";
import html2canvas from "html2canvas";
import ReactCanvasConfetti from "react-canvas-confetti";
import * as tf from "@tensorflow/tfjs";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import * as handdetection from "@tensorflow-models/hand-pose-detection";
import { setThreadsCount } from "@tensorflow/tfjs-backend-wasm";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Music from "./../common/Music";
import b64toBlob from "b64-to-blob";
import Particle from "./Particle";
import ParticleEffect from "./ParticleEffect";
import { BrowserView, MobileView } from 'react-device-detect';

tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
);

//rtk 관련코드
const mapStateToProps = (state) => ({
  ovsession: state.ovsession.value,
  uid: state.ovsession.userid,
  ovcake: state.ovsession.cake,
  ovmusic: state.ovsession.music,
  ovplayeridx: state.ovsession.playerIdx,
  ovplayerplay: state.ovsession.playerPlay,
});
const mapDispatchToProps = () => ({
  setOvSession,
  setUserId,
  setCake,
  setMusic,
});

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

var publisher;

const OPENVIDU_SERVER_URL = "https://i7c203.p.ssafy.io:8447";
const OPENVIDU_SERVER_SECRET = "PAZAMA";

class OpenVideo extends Component {
  constructor(props) {
    super(props);
    this.animationInstance = null;

    this.state = {
      mySessionId: props.roomIdx.slice(0, props.roomIdx.length - 6).replace(/%/g, ""),
      myUserName: "temp",
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      messages: [],
      message: "",
      show: false,
      show2: true,
      show3: false,
      cakeshow: false,

      flag: props.flag,
      isHost: false,
      myEmail: "",
      roomId: props.roomIdx,
      partyHost: "",
      partyName: "",
      partyDesc: "",
      partyBg: "",
      partyCake: "",
      partyCandle: "",
      partyDate: props.partyDate,
      shot: false,
      imgUrl: undefined,
      fileName: "",
      countCompleted: true,
      count: 0,
      tempBg: "",
    };
    this.props.setCake("false");

    // 자신의 회원정보 불러오기
    let token = sessionStorage.getItem("accessToken");
    axios({
      url: "https://i7c203.p.ssafy.io/api/users/me",
      method: "get",
      headers: { accessToken: token },
    })
      .then((res) => {
        this.setState({
          myUserName: res.data.result.nickname,
          myEmail: res.data.result.email,
        });
        console.log("회원정보 불러오기 성공");
        console.log(res);
        console.log(this.state.myUserName);
      })
      .catch(() => {
        document.location.href = "/NotFound";
      });

    // 현재 방정보 불로오기
    axios({
      url: "https://i7c203.p.ssafy.io/api/rooms",
      method: "get",
      headers: { accessToken: token },
      params: {
        roomIdx: this.state.roomId, // params
      },
    })
      .then((res) => {
        console.log("방정보 불러오기 성공", res.data.result);
        // console.log(this.state.roomId);
        this.setState({
          partyHost: res.data.result.partyHost,
          partyName: res.data.result.partyName,
          partyDesc: res.data.result.partyDesc,
          partyBg: "/frame" + (res.data.result.partyBg + 1) + ".png",
          partyCake: "/cake" + (res.data.result.partyCake + 1) + ".png",
          partyCandle: "/candle" + (res.data.result.partyCandle + 1) + ".png",
          tempBg: "/frame" + (res.data.result.partyBg + 1) + ".png",
        });
        if (this.state.partyHost == this.state.myEmail) {
          this.setState((state) => ({ isHost: true }));
        }
      })
      .then((res) => {})
      .catch(() => {
        document.location.href = "/NotFound";
      });

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.chattoggle = this.chattoggle.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.deletetoggleShow = this.deletetoggleShow.bind(this);

    this.sendcakeByClick = this.sendcakeByClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }
  chattoggle() {
    this.setState({ chaton: !this.state.chaton });
  }
  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }
  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  sendmessageByClick() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          userName: this.state.myUserName,
          text: this.state.message,
          chatClass: "messages__item--operator",
        },
      ],
    });

    const mySession = this.state.session;

    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [],
      type: "chat",
    });

    this.setState({
      message: "",
    });
  }

  sendcakeByClick() {
    // 모션인식이나 음성인식으로 케이크를 끌때는 로컬 스테이트를 바꾸기가 힘들어서 이렇게 변경
    // 케이크 시그널을 보낼때 로컬 스테이트는 바꾸지 않는다.
    // => 내가 나한테 보낸 시그널도 조건문 거치지않고 받아서 openvideo.js안에서 스테이트를 변경하도록
    // this.setState({
    //   cakeshow: !this.state.cakeshow,
    // });
    // this.props.setCake(this.state.cakeshow);
    const mySession = this.state.session;
    console.log(this.state.cakeshow, this.state.myUserName);

    mySession.signal({
      data: `${this.state.myUserName},${this.state.cakeshow}`,
      to: [],
      type: "cakeshow",
    });
  }

  sendmessageByEnter(e) {
    if (e.key === "Enter" && this.state.message) {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: "messages__item--operator",
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: "chat",
      });

      this.setState({
        message: "",
      });
    }
  }

  toggleShow() {
    if (this.state.show === false) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }
  deletetoggleShow() {
    if (this.state.show3 === false) {
      this.setState({ show3: true });
    } else {
      this.setState({ show3: false });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        this.props.setOvSession(this.state.session);
        this.props.setUserId(this.state.myUserName);

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });
        mySession.on("signal:chat", (event) => {
          let chatdata = event.data.split(",");
          if (chatdata[0] !== this.state.myUserName) {
            this.setState({
              messages: [
                ...this.state.messages,
                {
                  userName: chatdata[0],
                  text: chatdata[1],
                  chatClass: "messages__item--visitor",
                },
              ],
            });
          }
        });

        mySession.on("signal:picture", (event) => {
          let picdata = event.data.split(",");
          if (picdata[1] == "timer") {
            this.removediv();
            this.setState({ shot: true });
          }
        });

        mySession.on("signal:cakeshow", (event) => {
          let cakeShow = event.data.split(",");
          // if (cakeShow[0] !== this.state.myUserName) { //sendcakeByclick 에서 스테이트 직접 변경하지 않고 내가보낸 시그널도 내가 직접받게 구현함
          this.setState({
            cakeshow: cakeShow[1] === "true" ? false : true,
          });
          this.props.setCake(cakeShow[1] === "true" ? "false" : "true");
          // }
        });

        //모션인식 받는 부분
        mySession.on("signal:motion", (event) => {
          let chatdata = event.data.split(",");
          let prevbg = this.state.partyBg;
          switch (chatdata[1]) {
            case "hand-v":
              // if (prevbg != this.state.tempBg) break;
              if (this.state.tempBg == "v") break;
              this.setState({
                tempBg: "v",
              });
              setTimeout(() => {
                if (this.state.tempBg == "v")
                  this.setState({
                    tempBg: prevbg,
                  });
              }, 5000);
              break;
            case "hand-heart":
              // if (prevbg != this.state.tempBg) break;
              if (this.state.tempBg == "heart") break;
              this.setState({
                tempBg: "heart",
              });
              setTimeout(() => {
                if (this.state.tempBg == "heart")
                  this.setState({
                    tempBg: prevbg,
                  });
              }, 5000);
              break;
            case "hand-flip":
              this.confetti();
              break;
            case "hand-one":
              if (this.state.tempBg == "one") break;
              this.setState({
                tempBg: "one",
              });
              setTimeout(() => {
                if (this.state.tempBg == "one")
                  this.setState({
                    tempBg: prevbg,
                  });
              }, 5000);
              break;
            case "fire-off":
              this.setState({
                show2: false,
              });
              break;
            case "fire-on":
              this.setState({
                show2: true,
              });
              break;
            default:
              break;
          }
          // console.log(chatdata[1]);
        });
        //음성인식 받는 부분
        mySession.on("signal:speech", (event) => {
          let chatdata = event.data.split(",");
          switch (chatdata[1]) {
            case "music_hiphop":
              this.props.ovmusic("hiphop");
              break;
            case "music_cyworld":
              this.props.ovmusic("cyworld");
              break;
            case "music_dance":
              this.props.ovmusic("dance");
              break;
            case "music_jazz":
              this.props.ovmusic("jazz");
              break;
            case "music_birthday":
              this.props.ovmusic("birthday");
              break;
            case "music_indie":
              this.props.ovmusic("independent");
              break;
            case "music_backward":
              this.props.ovplayeridx(chatdata[2]);
              this.props.ovplayerplay(true);
              break;
            case "music_forward":
              this.props.ovplayeridx(chatdata[2]);
              this.props.ovplayerplay(true);
              break;
            case "music_play":
              this.props.ovplayerplay(true);
              break;
            case "music_pause":
              this.props.ovplayerplay(false);
              break;
            case "cake_show":
              this.setState({
                cakeshow: true,
              });
              this.props.setCake("true");
              break;
            case "cake_clear":
              this.setState({
                cakeshow: false,
              });
              this.props.setCake("false");
              break;
            case "confetti":
              this.confetti();
              break;
            case "heart":
              break;
            case "hand-v":
              break;
            case "hand-one":
              break;
            default:
              break;
          }
          // console.log(chatdata[1]);
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter((device) => device.kind === "videoinput");

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    publisher = undefined;
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: this.state.roomId,
      myUserName: this.state.myUserName,
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const popover1 = (
      <Popover className="popover1">
        <button
          className="takebtn"
          onClick={() => {
            if (this.state.partyHost === this.state.myEmail && this.state.partyHost != "") {
              this.removediv();
              // this.setState({ shot: true });
              this.state.session.signal({
                data: `${this.state.myUserName},timer`,
                to: [],
                type: "picture",
              });
            }
          }}
        >
          사진찍기
        </button>

        <div id="frame" className="frame"></div>
        <div className="bar">
          <p className="text5">저장된 사진은 피드에서 볼 수 있습니다.</p>
          <button
            className="downloadbtn"
            onClick={() => {
              let token = sessionStorage.getItem("accessToken");
              if (this.state.partyHost === this.state.myEmail && this.state.partyHost != "") {
                this.removediv();

                axios.all([
                  axios({
                    url: "https://i7c203.p.ssafy.io/image/upload",
                    method: "post",
                    headers: {
                      processData: false,
                      "Content-Type": "multipart/form-data",
                    },
                    data: this.state.imgUrl,
                  })
                    .then((res) => {
                      console.log(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    }),

                  axios({
                    url: "https://i7c203.p.ssafy.io/api/picture",
                    method: "post",
                    data: {
                      roomIdx: this.state.roomId,
                      picture: `https://i7c203.p.ssafy.io/images/${this.state.fileName}`,
                    },
                  })
                    .then((res) => {
                      console.log(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    }),
                ]);
              }
            }}
          >
            <img className="download" src="/save.png" alt="download" />
          </button>
          <button
            className="trashbtn"
            onClick={() => {
              if (this.state.partyHost === this.state.myEmail && this.state.partyHost != "") {
                this.removediv();
              }
            }}
          >
            <img className="trash" src="/trash.png" alt="trash" />
          </button>
        </div>
      </Popover>
    );

    const popover2 = (
      <Popover className="popover2">
        <button className="voicebtn" onClick={higherPitch}>
          <img className="voice1" src="/arrow-up.png" alt="voice1" />
        </button>
        <button className="voicebtn" onClick={lowerPitch}>
          <img className="voice2" src="/down-arrow.png" alt="voice2" />
        </button>
        <button className="voicebtn" onClick={removeFilters}>
          <img className="voice4" src="/voiceoff.png" alt="voice4" />
        </button>
      </Popover>
    );

    const mySessionId = this.state.mySessionId;
    const messages = this.state.messages;
    const isHost = this.state.isHost;
    let cakeshow = this.state.cakeshow;

    let Main = "";
    let Cakeshow = "";
    let Candleshow = "";
    let Fireshow = "";
    let Firecssshow = "";

    if (cakeshow === true) {
      Cakeshow = "cake";
      Main = "main-container1";
      Candleshow = "candle";
      Fireshow = "fire";
      Firecssshow = "firecss";
    } else {
      Cakeshow = "cake1";
      Main = "main-container";
      Candleshow = "candle1";
      Fireshow = "fire1";
      Firecssshow = "firecss1";
    }
    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const daySeconds = 86400;

    const timerProps = {
      isPlaying: true,
      size: 120,
      strokeWidth: 6,
    };

    const renderTime = (dimension, time) => {
      return (
        <div className="time-wrapper">
          <div className="time">{time}</div>
          <div>{dimension}</div>
        </div>
      );
    };

    const validURL = encodeURIComponent(this.state.roomId);

    //오픈비두 필터
    function textOverlay() {
      publisher.stream
        .applyFilter("GStreamerFilter", {
          command: "timeoverlay valignment=bottom halignment=right font-desc='Sans, 20'",
        })
        .then(() => {
          console.log("time added!");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function higherPitch() {
      publisher.stream
        .applyFilter("GStreamerFilter", {
          command: "pitch pitch=2",
        })
        .then(() => {
          console.log("picth adjusted!");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function lowerPitch() {
      publisher.stream
        .applyFilter("GStreamerFilter", {
          command: "pitch pitch=0.7",
        })
        .then(() => {
          console.log("picth adjusted!");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function showHat() {
      publisher.stream.applyFilter("FaceOverlayFilter").then((filter) => {
        filter.execMethod("setOverlayedImage", {
          uri: "https://cdn.pixabay.com/photo/2013/07/12/14/14/derby-148046_960_720.png",
          offsetXPercent: "-0.2F",
          offsetYPercent: "-0.8F",
          widthPercent: "1.3F",
          heightPercent: "1.0F",
        });
      });
    }

    function filterTest() {
      publisher.stream
        .applyFilter("GStreamerFilter", {
          command: "bulge",
        })
        .then(() => {
          console.log("picth adjusted!");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function removeFilters() {
      publisher.stream
        .removeFilter()
        .then(() => {
          console.log("Filters removed");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return (
      <div>
        <BrowserView>
        
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img
                src="/pazamafont.png"
                alt="pajama logo"
                style={{ width: "200px", height: "100px", cursor: "pointer","marginLeft":"1rem","marginTop":"1rem" }}
                onClick={() => {
                  document.location.href = "/";
                }}
              />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <form className="form-group" onSubmit={this.joinSession}>
                <div className="nameDiv">{this.state.partyName}</div>
                <div className="descDiv">{this.state.partyDesc}</div>
                <div id="counter" className="counter"></div>
                <div id="bu"></div>
                <br></br>
                {this.state.partyHost === this.state.myEmail && this.state.partyHost != "" ? (
                  <div>
                    <p className="text-center">
                      <input
                        className="joinbtn"
                        name="commit"
                        type="button"
                        value="파티수정"
                        style={{"backgroundColor":"#FFE9EF",'textAlign':"center"}}
                        onClick={() => {
                          document.location.href = `/updateparty/${validURL}`;
                        }}
                      />
                    </p>
                    <p className="text-center">
                      <input
                        className="joinbtn"
                        name="commit"
                        type="button"
                        value="파티삭제"
                        style={{"backgroundColor":"#FFE9EF",'textAlign':"center"}}
                        onClick={() => {
                          axios({
                            url: "https://i7c203.p.ssafy.io/api/rooms",
                            method: "delete",
                            headers: {
                              accessToken: sessionStorage.getItem("accessToken"),
                            },
                            params: { roomIdx: this.state.roomId },
                          }).then((res) => {
                            this.deletetoggleShow();
                          });
                        }}
                      />
                    </p>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        </BrowserView>

        <MobileView>
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img
                src="/pazamafont.png"
                alt="pajama logo"
                style={{ width: "120px", height: "60px", cursor: "pointer","marginLeft":"1rem","marginTop":"1rem" }}
                onClick={() => {
                  document.location.href = "/";
                }}
              />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <form className="form-group" onSubmit={this.joinSession}>
                <div className="nameDiv" style={{"fontSize":"50px"}}>{this.state.partyName}</div>
                <div className="descDiv" style={{"fontSize":"40px"}}>{this.state.partyDesc}</div>
                <div id="counter" className="counter" style={{width:"100%", "fontSize":"30px","marginBottom":"1rem",'textAlign':"center"}}></div>
                <div id="bu"></div>
                <br></br>
                {this.state.partyHost === this.state.myEmail && this.state.partyHost != "" ? (
                  <div>
                    <p className="text-center">
                      <input
                        className="joinbtn"
                        name="commit"
                        type="button"
                        value="파티수정"
                        onClick={() => {
                          document.location.href = `/updateparty/${validURL}`;
                        }}
                        style={{fontSize:"17px","width":"120px", "height":"55px","backgroundColor":"#FFE9EF",'textAlign':"center"}}
                      />
                    </p>
                    <p className="text-center">
                      <input
                        className="joinbtn"
                        name="commit"
                        type="button"
                        value="파티삭제"
                        style={{fontSize:"17px","width":"120px", "height":"55px","backgroundColor":"#FFE9EF"}}
                        onClick={() => {
                          axios({
                            url: "https://i7c203.p.ssafy.io/api/rooms",
                            method: "delete",
                            headers: {
                              accessToken: sessionStorage.getItem("accessToken"),
                            },
                            params: { roomIdx: this.state.roomId },
                          }).then((res) => {
                            this.deletetoggleShow();
                          });
                        }}
                      />
                    </p>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        </MobileView>

        {this.state.session !== undefined ? (
          <div className="partyroom">
            <div className="header">
              <img
                className="pazama"
                src="/pazamafont.png"
                alt="logo"
                width="150px"
                height="75px"
              ></img>
              {/* 호스트인지 게스트인지 버튼 구분 */}
              {this.state.partyHost === this.state.myEmail && this.state.partyHost != "" ? (
                <>
                  <div className="musicmodal" style={{ display: "none" }}>
                    <div>
                      <div className="musicDiv">
                        <Music />
                        <div className="chatbox__footer"></div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="navbtn"
                    onClick={() => {
                      this.sendcakeByClick();
                      // this.setState({show2:true})
                      const mySession = this.state.session;
                      mySession.signal({
                        data: `${this.state.myUserName},fire-on`,
                        to: [],
                        type: "motion",
                      });
                    }}
                  >
                    <img src="/birthday-cake.png" alt="logo" width="60px" height="60px"></img>
                  </button>
                  <OverlayTrigger trigger="click" placement="bottom" overlay={popover1}>
                    <Image
                      className="capture"
                      src="/camera.png"
                      alt="capture"
                      style={{
                        width: "60px",
                        height: "60px",
                        cursor: "pointer",
                      }}
                    />
                  </OverlayTrigger>
                  <Image
                    type="button"
                    onClick={() => {
                      if (this.state.count % 2 == 0) {
                        const di = (document.querySelector(".musicmodal").style.display = "block");
                      } else {
                        const di = (document.querySelector(".musicmodal").style.display = "none");
                      }
                      this.setState({ count: this.state.count + 1 });
                    }}
                    className="music"
                    src="/music.png"
                    alt="logo"
                    style={{ width: "60px", height: "60px" }}
                  />
                </>
              ) : (
                <>
                  <div className="musicmodal" style={{ display: "none" }}>
                    <div>
                      <div className="musicDiv">
                        <Music />
                        <div className="chatbox__footer"></div>
                      </div>
                    </div>
                  </div>
                  <button className="navbtn">
                    <img src="/birthday-cake.png" alt="logo" width="60px" height="60px"></img>
                  </button>
                  <OverlayTrigger trigger="click" placement="bottom" overlay={popover1}>
                    <Image
                      className="capture"
                      src="/camera.png"
                      alt="capture"
                      style={{ width: "60px", height: "60px" }}
                    />
                  </OverlayTrigger>
                  <Image
                    className="music"
                    src="/music.png"
                    alt="logo"
                    style={{ width: "60px", height: "60px" }}
                  />
                </>
              )}
            </div>
            <div
              id="session"
              className="main-session"
              style={{
                backgroundImage: "url(" + `${this.state.partyBg}` + ")",
              }}
            >
              <Particle bg={this.state.tempBg} />
              <div id="main-container" className={Main}>
                {this.state.mainStreamManager !== undefined ? (
                  <div id="main-video" className="main-video">
                    <UserVideoComponent streamManager={this.state.mainStreamManager} />
                    {/* <input
                      className="btn btn-large btn-success"
                      type="button"
                      id="buttonSwitchCamera"
                      onClick={this.switchCamera}
                      value="Switch Camera"
                    /> */}
                  </div>
                ) : null}

                {this.state.subscribers.map((sub, i) => (
                  <div key={i} className="stream-video" id="stream-video">
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
                <img id="cake1" className={Cakeshow} src={this.state.partyCake} alt="cake1"></img>
                <img id="heart" className={Candleshow} src={this.state.partyCandle} alt="heart" />
                <div className={Firecssshow}>
                  <FadeInOut show={this.state.show2} duration={500}>
                    <img className={Fireshow} id="heartfire" src="/fire.gif" alt="fire" />
                  </FadeInOut>
                </div>
              </div>
            </div>
            {this.state.shot ? (
              <div className="timer-wrapper">
                <CountdownCircleTimer
                  isPlaying
                  duration={3}
                  colors={["#004777"]}
                  trailStrokeWidth={0}
                  strokeWidth={0}
                  onComplete={() => {
                    // 사진찍는 함수 삽입
                    this.takepicture();
                    this.setState({ shot: false });
                    console.log("종료");
                  }}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              </div>
            ) : null}
            <div className="main-footer">
              <div className="footer">
                {this.state.videostate === undefined || this.state.videostate
                  ? (this.state.videostate = true)
                  : (this.state.videostate = this.state.videostate)}
                <button
                  className="cam-btn"
                  id="buttonTurnCamera"
                  onClick={() => {
                    this.state.publisher.publishVideo(!this.state.videostate);
                    this.setState({ videostate: !this.state.videostate });
                  }}
                >
                  {this.state.videostate ? (
                    <img className="camon" src="/videocamon.png" />
                  ) : (
                    <img className="camoff" src="/videocamoff.png" />
                  )}
                </button>

                {this.state.audiostate === undefined || this.state.audiostate
                  ? (this.state.audiostate = true)
                  : (this.state.audiostate = this.state.audiostate)}
                <button
                  className="mic-btn"
                  id="buttonTurnAudio"
                  onClick={() => {
                    this.state.publisher.publishAudio(!this.state.audiostate);
                    this.setState({ audiostate: !this.state.audiostate });
                  }}
                >
                  {this.state.audiostate ? (
                    <img className="micon" src="/micon.png" />
                  ) : (
                    <img className="micoff" src="/micoff.png" />
                  )}
                </button>
                <Speech />
                <OverlayTrigger trigger="click" placement="top" overlay={popover2}>
                  <Image
                    className="voice"
                    src="/voice.png"
                    alt="voice"
                    style={{ width: "50px", height: "50px" }}
                  />
                </OverlayTrigger>
                <button className="chatbtn" onClick={this.toggleShow}>
                  <img className="chat" src="/chat.png" />
                </button>
                <button className="leavebtn" id="buttonLeaveSession" onClick={this.leaveSession}>
                  <img className="leave" src="/shutdown.png" />
                </button>
              </div>
            </div>
            <Camera style="display: none" />
            <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles} />
          </div>
        ) : null}
        {/* <div class="canvas-wrapper"></div> */}

        <Modal show={this.state.show} className="chatmodal" onHide={this.toggleShow}>
          <div>
            <div className="chatbox__support chatbox--active">
              <div style={{ "text-align": "center" }}>
                <img src="/pazamafont.png" alt="logo" width="80px" height="40px"></img>
              </div>

              <div className="chatbox__messages" ref="chatoutput">
                <Messages messages={messages} myUserName={this.state.myUserName} />
              </div>
              <div className="chatbox__footer">
                <input
                  id="chat_message"
                  className="chat_message"
                  type="text"
                  placeholder="메세지를 작성하세요."
                  onChange={this.handleChatMessageChange}
                  onKeyPress={this.sendmessageByEnter}
                  value={this.state.message}
                />
                {this.state.message !== "" ? (
                  <button className="chatbox__send--footer" onClick={this.sendmessageByClick}>
                    전송
                  </button>
                ) : (
                  <button className="chatbox__send--footer" disabled>
                    전송
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>

        <Modal show={this.state.show3} className="deletemodal" onHide={this.toggleShow3}>
          <Modal.Header closeButton>
            <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>PAZAMA</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ "font-family": "oldpicture", "font-size": "20px" }}>
            파티가 삭제되었습니다!
          </Modal.Body>
          <Modal.Footer>
            <button
              style={{
                border: "none",
                "font-family": "oldpicture",
                backgroundColor: "#9D9D9D",
                color: "white",
                display: "none",
              }}
            >
              Close
            </button>
            <button
              style={{
                color: "black",
                backgroundColor: "#FD7A99",
                border: "none",
                "font-family": "oldpicture",
                "box-shadow": "none",
              }}
              onClick={() => {
                document.location.href = "/";
              }}
            >
              close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        customSessionId: sessionId,
        kurentoOptions: {
          allowedFilters: ["GStreamerFilter", "FaceOverlayFilter"],
        },
      });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(OPENVIDU_SERVER_URL + "/accept-certificate");
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      // var data = {};
      var data = JSON.stringify({
        kurentoOptions: {
          allowedFilters: ["GStreamerFilter", "FaceOverlayFilter"],
        },
      });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  //캡처기능
  takepicture() {
    const targetvideo = document.getElementById("session");
    // const targetvideo = document.querySelector("#localUser").querySelector("video");
    html2canvas(targetvideo).then((xcanvas) => {
      const canvdata = xcanvas.toDataURL("image/png");
      const decodImg = atob(canvdata.split(",")[1]);
      let array = [];
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i));
      }

      const file = new Blob([new Uint8Array(array)], { type: "image/png" });
      const fileName =
        "img_" +
        new Date().getFullYear() +
        (new Date().getMonth() + 1) +
        new Date().getDate() +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        ".png";
      this.setState({ fileName: fileName });
      let formData = new FormData();
      formData.append("uploadFile", file, fileName);
      this.setState({ imgUrl: formData });

      // const mimeType = "image/png"; // image/jpeg
      // const realData = canvdata.split(",")[1]; // 이 경우에선 /9j/4AAQSkZJRgABAQAAAQABAAD...
      // const blob = b64toBlob(realData, mimeType);
      // this.setState({ imgUrl: window.URL.createObjectURL(blob) });
      // document.getElementById('myimage').src = window.URL.createObjectURL(blob)

      //시그널링 테스트 요기
      // const mySession = this.state.session;
      // mySession.signal({
      //   data: `${this.state.myUserName},timer`,
      //   to: [],
      //   type: "picture",
      // });
      // ============요기까지

      var photo = document.createElement("img");
      photo.setAttribute("src", canvdata);
      photo.setAttribute("width", 200);
      photo.setAttribute("height", 120);
      document.getElementById("frame").appendChild(photo);
    });
  }

  removediv() {
    const framediv = document.getElementById("frame");
    framediv.innerHTML = "";
  }
  //종이꽃효과
  makeShot = (particleRatio, opts) => {
    this.animationInstance &&
      this.animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  };
  confetti = () => {
    this.makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    this.makeShot(0.2, {
      spread: 60,
    });

    this.makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    this.makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    this.makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };
  getInstance = (instance) => {
    this.animationInstance = instance;
  };
}

// export default OpenVideo;
export default connect(mapStateToProps, mapDispatchToProps())(OpenVideo);
