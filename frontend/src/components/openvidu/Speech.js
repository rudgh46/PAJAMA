import React, { Component } from "react";
import Word from "./Word";
import ListenerButton from "./ListenerButton";
import { connect } from "react-redux";
import { setOvSession, setUserId, setCake, setMusic } from "../../modules/ovsessionSlice";

//rtk 관련코드
const mapStateToProps = (state) => ({
  ovsession: state.ovsession.value,
  uid: state.ovsession.userid,
  ovcake: state.ovsession.value,
  ovmusic: state.ovsession.music,
});
const mapDispatchToProps = () => ({
  setOvSession,
  setUserId,
  setCake,
  setMusic,
});

class Speech extends Component {
  state = {
    show: false,
    listening: false,
    text: "죄송하지만 이해할 수가 없어요.",
  };

  componentDidMount() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      alert("현재 브라우저에서는 음성인식을 사용할 수 없어요. 파자마는 크롬에서 가장 잘 작동해요!");
      return;
    }

    console.log("스피치테스트", this.props.ovsession);
    console.log("스피치테스트", this.props.uid);
    this.recognition = new Recognition();
    this.recognition.lang = process.env.REACT_APP_LANGUAGE || "ko-KR";
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const mySession = this.props.ovsession;

      console.log("transcript", text);
      this.setState({ text });
      const textP = text.includes("파자마");
      const textN = text.includes("노래");
      const textT = text.includes("틀어");
      const textConfetti = text.includes("폭죽") || text.includes("불꽃놀이");
      // 힙합, 싸이월드, 댄스,재즈, 생일 축하, 인디
      if (textP && textN && textT) {
        const textHip = text.includes("힙합");
        const textSW = text.includes("싸이월드");
        const textDance = text.includes("댄스");
        const textJazz = text.includes("재즈");
        const textParty = text.includes("생일");
        const textIn = text.includes("인디");
        if (textHip) {
          // console.log("힙합");
          mySession.signal({
            data: `${this.props.uid},music_hiphop`,
            to: [],
            type: "speech",
          });
        } else if (textSW) {
          // console.log("싸이월드");
          mySession.signal({
            data: `${this.props.uid},music_cyworld`,
            to: [],
            type: "speech",
          });
        } else if (textDance) {
          // console.log("댄스");
          mySession.signal({
            data: `${this.props.uid},music_dance`,
            to: [],
            type: "speech",
          });
        } else if (textJazz) {
          // console.log("재즈");
          mySession.signal({
            data: `${this.props.uid},music_jazz`,
            to: [],
            type: "speech",
          });
        } else if (textParty) {
          // console.log("생일 축하");
          mySession.signal({
            data: `${this.props.uid},music_birthday`,
            to: [],
            type: "speech",
          });
        } else if (textIn) {
          // console.log("인디");
          mySession.signal({
            data: `${this.props.uid},music_indie`,
            to: [],
            type: "speech",
          });
        }
      }
      //불꽃놀이
      if (textP && textConfetti) {
        mySession.signal({
          data: `${this.props.uid},confetti`,
          to: [],
          type: "speech",
        });
      }
      //====================아래로 인식할ㄷ 단어 필요함=======================================================
      //cake_show;
      if (textP && false) {
        mySession.signal({
          data: `${this.props.uid},cake_show`,
          to: [],
          type: "speech",
        });
      }
      //케이크치워;
      if (textP && false) {
        mySession.signal({
          data: `${this.props.uid},cake_clear`,
          to: [],
          type: "speech",
        });
      }
      //하뜨;
      if (textP && false) {
        mySession.signal({
          data: `${this.props.uid},heart`,
          to: [],
          type: "speech",
        });
      }
      //V;
      if (textP && false) {
        mySession.signal({
          data: `${this.props.uid},hand-v`,
          to: [],
          type: "speech",
        });
      }
      //1;
      if (textP && false) {
        mySession.signal({
          data: `${this.props.uid},hand-one`,
          to: [],
          type: "speech",
        });
      }
    };

    this.recognition.onspeechend = () => {
      console.log("stopped");

      this.setState({ show: true });
    };

    this.recognition.onnomatch = (event) => {
      console.log("no match");
      this.setState({ text: "Sorry, can't hear" });
    };

    this.recognition.onstart = () => {
      this.setState({
        listening: true,
      });
    };

    this.recognition.onend = () => {
      console.log("end");

      this.setState({
        listening: false,
      });
      setTimeout(this.end, 3000);
    };

    this.recognition.onerror = (event) => {
      console.log("error", event);

      this.setState({
        show: true,
        text: event.error,
      });
    };
  }

  start = () => {
    this.recognition.start();
  };

  end = () => {
    this.recognition.stop();
    this.setState({ show: false });
  };

  handleClose = () => {
    // this.setState({ show: false });
  };

  render() {
    return (
      <main className="demo-1">
        <ListenerButton onStart={this.start} onEnd={this.end} disabled={this.state.listening} />
        {this.state.show ? (
          <Word text={this.state.text} onClose={this.handleClose} />
        ) : (
          // <ListenerButton
          //   onStart={this.start}
          //   onEnd={this.end}
          //   disabled={this.state.listening}
          // />
          console.log("인식불가")
        )}
      </main>
    );
  }
}

// export default Speech;
export default connect(mapStateToProps, mapDispatchToProps())(Speech);
