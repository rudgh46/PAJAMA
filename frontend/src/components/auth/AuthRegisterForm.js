import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: black;
    margin-bottom: 1rem;
    font-family: "star";
  }
`;

const StyledInput = styled.input`
  border-radius: 10px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ffe9ef;
  padding-left: 10px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  outline: none;
  width: 100%;
  display: flex;
  font-family: "oldpicture";
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #fd7a99;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const StyledInputDis = styled.input`
  border-radius: 10px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ffe9ef;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  outline: none;
  width: 100%;
  display: flex;
  font-family: "oldpicture";
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #fd7a99;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const ButtonWithMarinTop = styled(Button)`
  margin-top: 1rem;
`;

const StyleButton = styled.button`
  margin-top: 4px;
  border: none;
  border-radius: 10px;
  font-size: 0.8rem;
  font-family: "oldpicture";
  height: 2rem;
  color: black;
  outline: none;
  cursor: pointer;
  display: inline;
  margin-left: -70px;
  background: #fd7a99;
  &:hover {
    background: #ffa4bd;
  }
`;

const Counter = styled.div`
  display: flex;
  size: 30px;
`;

const Mid = styled.div`
  display: flex;
  margin-top: 5px;
`;

const AuthRegisterForm = () => {
  const [show1, setShow1] = useState(false); //모달(이메일인증X)
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false); //비밀번호자릿수
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false); //이메일인증실패
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [show4, setShow4] = useState(false); //비밀번호영문자혼합
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show5, setShow5] = useState(false); //비밀번호불일치
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);
  const [show6, setShow6] = useState(false); //존재하는이메일
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  const [show7, setShow7] = useState(false); //회원가입성공
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);
  const [show8, setShow8] = useState(false); //회원가입실패
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const minuteSeconds = 60;
  const hourSeconds = 3600;

  const [playing, setPlaying] = useState(false);
  const [replay, setReplay] = useState(false);
  const timerProps = {
    isPlaying: playing,
    size: 30,
    strokeWidth: 0,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time" style={{ fontSize: "0.8rem" }}>
          {time}
        </div>
        <div>{dimension}</div>
      </div>
    );
  };

  let stratTime = Date.now() / 1000;
  let endTime = stratTime + 180;

  let remainingTime = endTime - stratTime;

  function initTime() {
    remainingTime = 180;
  }
  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;

  let [credentials, setCredentials] = useState({
    email: "",
    tel: "",
    pwd: "",
    nickname: "",
    name: "",
  });

  let [credential, setCredential] = useState({
    authNumber: "",
    email: "",
  });

  const [emailvalid, setEmailvalid] = useState(false);
  const [count, setCount] = useState(0);

  let [password1, setPassword1] = useState("");
  let [password2, setPassword2] = useState("");
  let [tel, setTel] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userName, setUserName] = useState("");
  let [userNickname, setUserNickname] = useState("");
  let [code, setCode] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (emailvalid) {
      if (password2 === password1) {
        if (password1.length < 6 || password1.length > 16) {
          handleShow2();
        } else {
          let countNum = 0;
          let countEng = 0;
          let i = 0;
          for (i = 0; i < password1.length; i++) {
            if (password1.charAt(i) >= "A" && password1.charAt(i) <= "z") {
              countEng++;
            } else if (
              password1.charAt(i) >= "0" &&
              password1.charAt(i) <= "9"
            ) {
              countNum++;
            }
          }
          if (countEng === 0 || countNum === 0) {
            handleShow4();
          } else {
            setCredentials(
              (credentials.email = userEmail),
              (credentials.pwd = password1),
              (credentials.name = userName),
              (credentials.nickname = userNickname),
              (credentials.tel = tel)
            );
            axios({
              url: "https://i7c203.p.ssafy.io/api/users",
              method: "post",
              data: credentials,
            })
              .then((res) => {
                if (res.data.result === "success") {
                  handleShow7();
                } else {
                  handleShow6();
                  document.location.href = "/register";
                }
              })
              .catch(() => {
                console.log("회원가입 실패");
                handleShow8();
                document.location.href = "/register";
              });
          }
        }
      } else {
        handleShow5();
        // document.location.href = "/register";
      }
    } else {
      handleShow1();
    }
  }

  function expireCheck() {
    console.log("삭제");
    console.log(userEmail);
    axios({
      url: "https://i7c203.p.ssafy.io/api/users/mail",
      method: "delete",
      data: {
        email: userEmail,
      },
    })
      .then((res) => {
        console.log(res);
        console.log("삭제성공");
      })
      .catch((res) => {
        console.log(res);
        console.log("삭제실패");
      });
  }

  function sendCheck() {
    axios({
      url: "https://i7c203.p.ssafy.io/api/users/mail",
      method: "post",
      data: {
        id: userEmail,
        type: 0,
      },
    })
      .then((res) => {
        console.log(res);
        console.log("성공");
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return (
    <AuthFormBlock>
      <h3>회원가입</h3>
      <form onSubmit={onSubmit}>
        {emailvalid ? (
          <div className="d-flex">
            <StyledInput
              autoComplete="userEmail"
              name="userEmail"
              disabled="disabled"
              id="userEmail"
              placeholder="이메일"
              onInput={(event) => {
                setUserEmail(event.target.value);
              }}
              required
            />

            <StyleButton
              onClick={(e) => {
                setPlaying(true);
                e.preventDefault();
                console.log("시작");
              }}
            >
              인증완료
            </StyleButton>
          </div>
        ) : (
          <div className="d-flex">
            <StyledInput
              autoComplete="userEmail"
              name="userEmail"
              id="userEmail"
              placeholder="이메일"
              onInput={(event) => {
                setUserEmail(event.target.value);
              }}
              required
            />

            <StyleButton
              onClick={(e) => {
                setPlaying(true);
                e.preventDefault();
                console.log("시작");
              }}
            >
              <div>
                {replay ? (
                  <Counter>
                    <CountdownCircleTimer
                      {...timerProps}
                      colors="#000000"
                      duration={hourSeconds}
                      initialRemainingTime={remainingTime % hourSeconds}
                      onComplete={() => {
                        setReplay(false);
                        if (remainingTime == 0) {
                          expireCheck();
                        }
                      }}
                    >
                      {({ elapsedTime, color }) => (
                        <span style={{ color }}>
                          {renderTime(
                            "",
                            getTimeMinutes(hourSeconds - elapsedTime)
                          )}
                        </span>
                      )}
                    </CountdownCircleTimer>
                    <Mid>:</Mid>
                    <CountdownCircleTimer
                      {...timerProps}
                      colors="#000000"
                      duration={minuteSeconds}
                      initialRemainingTime={remainingTime}
                      onComplete={() => {
                        expireCheck();
                      }}
                    >
                      {({ elapsedTime, color }) => (
                        <span style={{ color }}>
                          {renderTime("", getTimeSeconds(elapsedTime) % 60)}
                        </span>
                      )}
                    </CountdownCircleTimer>
                  </Counter>
                ) : (
                  <div
                    onClick={() => {
                      setReplay(true);
                      sendCheck();
                      setCount(count + 1);
                    }}
                  >
                    {count === 0 ? "인증하기" : "재인증"}
                  </div>
                )}
              </div>
            </StyleButton>
          </div>
        )}

        <div className="d-flex">
          <StyledInput
            autoComplete="userEmailCheck"
            name="userEmailCheck"
            placeholder="이메일 인증번호"
            type="emailcheck"
            onInput={(event) => {
              event.preventDefault();
              setCode(event.target.value);
            }}
            required
          />

          {emailvalid ? (
            <StyleButton
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              인증완료
            </StyleButton>
          ) : (
            <StyleButton
              onClick={() => {
                setCredential(
                  (credential.authNumber = code),
                  (credential.email = userEmail)
                );
                console.log(credential);
                console.log("확인시작");

                axios({
                  url: "https://i7c203.p.ssafy.io/api/users/mail",
                  method: "get",
                  params: credential,
                })
                  .then((res) => {
                    console.log(res);
                    console.log("성공");
                    if (res.data.result === "success") {
                      setReplay(true);
                      setEmailvalid(true);
                    } else {
                      handleShow3();
                    }
                  })
                  .catch((res) => {
                    console.log(res);
                  });
              }}
            >
              확인하기
            </StyleButton>
          )}
        </div>
        <StyledInput
          autoComplete="current-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onInput={(event) => {
            setPassword1(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="new-password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="userName"
          name="userName"
          placeholder="이름"
          required
          onInput={(event) => {
            setUserName(event.target.value);
          }}
        />
        <StyledInput
          autoComplete="tel"
          name="tel"
          placeholder='전화번호 ("-"없이 숫자만 입력)'
          onInput={(event) => {
            setTel(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="userNickname"
          name="userNickname"
          placeholder="닉네임"
          onInput={(event) => {
            setUserNickname(event.target.value);
          }}
          required
        />
        <ButtonWithMarinTop fullWidth>회원가입</ButtonWithMarinTop>
      </form>
      {/* 이메일인증안했을때 */}
      <Modal
        centered
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          이메일을 인증해주세요.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={handleClose1}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 비밀번호자릿수 */}
      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          비밀번호를 6자리 이상 16자리 이하로 입력하세요.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={handleClose2}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 이메일인증실패 */}
      <Modal
        centered
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          인증번호가 일치하지 않습니다.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={() => {
              document.location.href = "/register";
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 비밀번호영문자혼합 */}
      <Modal
        centered
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          비밀번호는 영어와 숫자가 혼용되어야 합니다.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={handleClose4}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 비밀번호불일치 */}
      <Modal
        centered
        show={show5}
        onHide={handleClose5}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          비밀번호가 일치하지 않습니다.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={handleClose5}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 존재하는 이메일 */}
      <Modal
        centered
        show={show6}
        onHide={handleClose6}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          해당 이메일이 존재합니다.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={handleClose6}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 회원가입성공 */}
      <Modal
        centered
        show={show7}
        onHide={handleClose7}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          회원가입에 성공했습니다!
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={handleClose7}
          >
            Close
          </Button>
          <Button
            style={{
              color: "black",
              backgroundColor: "#FD7A99",
              border: "none",
              "font-family": "oldpicture",
              "box-shadow": "none",
            }}
            onClick={() => {
              document.location.href = "/login";
            }}
          >
            로그인
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 회원가입 실패 */}
      <Modal
        centered
        show={show8}
        onHide={handleClose8}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          회원가입에 실패했습니다.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={handleClose8}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </AuthFormBlock>
  );
};

export default AuthRegisterForm;
