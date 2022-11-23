import React from "react";
import { Popover, OverlayTrigger, Image } from "react-bootstrap";
import "./Popover.css";

//takepicture() 안에 document.body.appendChild(photo); => document.getElementId("frame").appendChild(photo); 로 바꾸기

//render 밑에
const popover = (
  <Popover className="popover">
    <button onClick={this.takepicture}>사진찍기</button>
    <div id="frame"></div>
    <div className="bar">
      <p className="text5">최대 5장까지 저장할 수 있습니다.</p>
      <button className="downloadbtn">
        <img className="download" src="/download.png" alt="download" />
      </button>
      <button className="trashbtn" onClick={this.removediv}>
        <img className="trash" src="/trash.png" alt="trash" />
      </button>
    </div>
  </Popover>
);

const popover2 = (
  <Popover className="popover2" id="popover-basic">
    <button className="voicebtn" onClick={this.higherPitch}>
      <img className="voice1" src="/arrow-up.png" alt="voice1" />
    </button>
    <button className="voicebtn" onClick={this.lowerPitch}>
      <img className="voice2" src="/down-arrow.png" alt="voice2" />
    </button>
    <button className="voicebtn">
      <img className="voice3" src="/mic2.png" alt="voice3" />
    </button>
    <button className="voicebtn" onClick={this.removeFilters}>
      <img className="voice4" src="/voiceoff.png" alt="voice4" />
    </button>
  </Popover>
);

const PopoverPage = () => {
  return (
    <>
      <div className="mainpage">
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popover}
          delay={{ show: 450 }}
        >
          <Image
            className="capture"
            src="/camera.png"
            alt="capture"
            style={{ width: "60px", height: "60px" }}
          />
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="top" overlay={popover2}>
          <Image
            className="voice"
            src="/voice.png"
            alt="voice"
            style={{ width: "75px", height: "75px" }}
          />
        </OverlayTrigger>
      </div>
    </>
  );
};

//export 위에 , takepicture이랑 같은 라인
// removediv() {
//     const framediv = document.getElementById("frame");
//     framediv.innerHTML = "";
//   };

export default PopoverPage;
