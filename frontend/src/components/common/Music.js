import "./Music.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "bootstrap/dist/css/bootstrap.min.css";
import songs from "./songs.js";
import { ImPlay3, ImPause2, ImBackward2, ImForward3 } from "react-icons/im";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import {
  setOvSession,
  setUserId,
  setCake,
  setMusic,
  setPlayerIdx,
  setPlayerPlay,
} from "../../modules/ovsessionSlice";

function Music() {
  const dispatch = useDispatch();
  let [genre, setGenre] = useState(null);
  const mySession = useSelector((state) => state.ovsession.value);
  const myUid = useSelector((state) => state.ovsession.userid);
  dispatch(setMusic(setGenre));

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="lb-wrap">
            <div className="lb-image">
              <img
                onClick={() => {
                  mySession.signal({
                    data: `${myUid},music_hiphop`,
                    to: [],
                    type: "speech",
                  });
                }}
                src="/hiphop.jpg"
              ></img>
            </div>
          </Col>
          <Col className="lb-wrap">
            <div className="lb-image">
              <img
                onClick={() => {
                  mySession.signal({
                    data: `${myUid},music_cyworld`,
                    to: [],
                    type: "speech",
                  });
                }}
                src="/acorn.jpg"
              ></img>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="lb-wrap">
            <div className="lb-image">
              <img
                onClick={() => {
                  mySession.signal({
                    data: `${myUid},music_birthday`,
                    to: [],
                    type: "speech",
                  });
                }}
                src="/happybirthday.jpg"
              ></img>
            </div>
          </Col>
          <Col className="lb-wrap">
            <div className="lb-image">
              <img
                onClick={() => {
                  mySession.signal({
                    data: `${myUid},music_indie`,
                    to: [],
                    type: "speech",
                  });
                }}
                src="/indie.jpg"
              ></img>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="lb-wrap">
            <div className="lb-image">
              <img
                onClick={() => {
                  mySession.signal({
                    data: `${myUid},music_dance`,
                    to: [],
                    type: "speech",
                  });
                }}
                src="/dance.jpg"
              ></img>
            </div>
          </Col>
          <Col className="lb-wrap">
            <div className="lb-image">
              <img
                onClick={() => {
                  mySession.signal({
                    data: `${myUid},music_jazz`,
                    to: [],
                    type: "speech",
                  });
                }}
                src="/jazz.jpg"
              ></img>
            </div>
          </Col>
        </Row>
      </Container>
      {genre ? <Player genre={genre} /> : null}
    </div>
  );
}

function Player(props) {
  const videoList = songs[props.genre];
  const [idx, setIdx] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  useEffect(() => {
    if (isPlay) {
      document
        .querySelector("#ytVideo")
        .contentWindow.postMessage(
          '{"event":"command","func":"' + "playVideo" + '","args":""}',
          "*"
        );
    } else {
      document
        .querySelector("#ytVideo")
        .contentWindow.postMessage(
          '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
          "*"
        );
    }
  }, [isPlay]);
  const isPlayVideo = () => {
    setIsPlay(!isPlay);
  };

  //redux
  const dispatch = useDispatch();
  const mySession = useSelector((state) => state.ovsession.value);
  const myUid = useSelector((state) => state.ovsession.userid);
  dispatch(setPlayerIdx(setIdx));
  dispatch(setPlayerPlay(setIsPlay));

  return (
    <div className="Player">
      <iframe
        id="ytVideo"
        width="800px"
        height="500px"
        src={`https://www.youtube.com/embed/${videoList[idx]}?autoplay=1&mute=0&autohide='2'&modestbranding=1&enablejsapi=1&version=3&playerapiid=ytplayer`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div>
        <ImBackward2
          className="Btn"
          size="24"
          style={{ margin: "10px", color: "#FD7A99" }}
          onClick={() => {
            // setIdx((idx - 1 + videoList.length) % videoList.length);
            // setIsPlay(true);
            mySession.signal({
              data: `${myUid},music_backward,${(idx - 1 + videoList.length) % videoList.length}`,
              to: [],
              type: "speech",
            });
          }}
        ></ImBackward2>

        {isPlay ? (
          <ImPause2
            className="Btn"
            size="24"
            style={{ margin: "10px", color: "#FD7A99" }}
            onClick={() => {
              // isPlayVideo();
              mySession.signal({
                data: `${myUid},music_pause`,
                to: [],
                type: "speech",
              });
            }}
          ></ImPause2>
        ) : (
          <ImPlay3
            size="24"
            className="Btn"
            style={{ margin: "10px", color: "#FD7A99" }}
            onClick={() => {
              // isPlayVideo();
              mySession.signal({
                data: `${myUid},music_play`,
                to: [],
                type: "speech",
              });
            }}
          ></ImPlay3>
        )}

        <ImForward3
          className="Btn"
          size="24"
          style={{ margin: "10px", color: "#FD7A99" }}
          onClick={() => {
            // setIdx((idx + 1) % videoList.length);
            // setIsPlay(true);
            let prevsong = (idx - 1 + videoList.length) % videoList.length;
            let nextsong = (prevsong + 2) % videoList.length;
            mySession.signal({
              data: `${myUid},music_forward,${nextsong}`,
              to: [],
              type: "speech",
            });
          }}
        ></ImForward3>
      </div>
    </div>
  );
}

export default Music;
