import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Params, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import axios from "axios";
import styles from "./AuthUpdateForm.module.css";
import Modal from "react-bootstrap/Modal";

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

const AuthUpdateForm = () => {
  let token = sessionStorage.getItem("accessToken");
  useEffect(() => {
    axios({
      url: "https://i7c203.p.ssafy.io/api/users/me",
      method: "get",
      headers: { accessToken: token },
    })
      .then((res) => {
        console.log(res);
        setEmail(res.data.result.email);
        setTel(res.data.result.tel);
        setName(res.data.result.name);
        setNickname(res.data.result.nickname);
        console.log(credentials);
      })
      .catch(() => {
        document.location.href = "/NotFound";
      });
  }, []);

  let [credentials, setCredentials] = useState({
    email: "",
    tel: "",
    pwd: "",
    nickname: "",
    name: "",
  });
  let [pwd1, setPwd1] = useState("");
  let [paw2, setPaw2] = useState("");
  let [tel, setTel] = useState("");
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false); //회원정보수정성공
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false); //비밀번호자릿수
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show5, setShow5] = useState(false); //비밀번호영문자혼합
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const [show6, setShow6] = useState(false); //비밀번호불일치
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const [show7, setShow7] = useState(false); //회원정보수정실패
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  function onSubmit(e) {
    e.preventDefault();
    if (paw2 === pwd1) {
      if (pwd1.length < 6 || pwd1.length > 16) {
        handleShow4();
      } else {
        let countNum = 0;
        let countEng = 0;
        let i = 0;
        for (i = 0; i < pwd1.length; i++) {
          if (pwd1.charAt(i) >= "A" && pwd1.charAt(i) <= "z") {
            countEng++;
          } else if (pwd1.charAt(i) >= "0" && pwd1.charAt(i) <= "9") {
            countNum++;
          }
        }
        if (countEng === 0 || countNum === 0) {
          handleShow5();
        } else {
          setCredentials(
            (credentials.email = email),
            (credentials.pwd = pwd1),
            (credentials.name = name),
            (credentials.nickname = nickname),
            (credentials.tel = tel)
          );

          axios({
            url: "https://i7c203.p.ssafy.io/api/users",
            method: "put",
            data: credentials,
            headers: { accessToken: token },
          })
            .then((res) => {
              if (res.data.result === "success") {
                handleShow3();
              }
            })
            .catch(() => {
              handleShow7();
              navigate("/mypage/update");
            });
        }
      }
    } else {
      handleShow6();
      navigate("/mypage/update");
    }
  }

  return (
    <>
      <AuthFormBlock>
        <h3 className={styles.h3}>회원정보수정</h3>
        <ButtonWithMarinTop onClick={handleShow} className={styles.button}>
          회원탈퇴
        </ButtonWithMarinTop>
        <form onSubmit={onSubmit}>
          <div className="d-flex">
            <StyledInput
              autoComplete="email"
              name="email"
              placeholder="이메일"
              type="email"
              onInput={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
              disabled
            />
          </div>
          <StyledInput
            autoComplete="current-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onInput={(event) => {
              setPwd1(event.target.value);
            }}
            required
          />
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={(event) => {
              setPaw2(event.target.value);
            }}
            required
          />
          <StyledInput
            autoComplete="name"
            name="name"
            placeholder="이름"
            onInput={(event) => {
              setName(event.target.value);
            }}
            value={name}
            required
          />
          <StyledInput
            autoComplete="tel"
            name="tel"
            placeholder="전화번호"
            onInput={(event) => {
              setTel(event.target.value);
            }}
            value={tel}
            required
          />
          <StyledInput
            autoComplete="nickname"
            name="nickname"
            placeholder="닉네임"
            onInput={(event) => {
              setNickname(event.target.value);
            }}
            value={nickname}
            required
          />
          <ButtonWithMarinTop fullWidth>회원정보수정</ButtonWithMarinTop>
        </form>
      </AuthFormBlock>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.dialog}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ "font-family": "oldpicture" }}>
          계정을 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              color: "white",
              backgroundColor: "#9D9D9D",
              border: "none",
              "font-family": "oldpicture",
              "box-shadow": "none",
            }}
            onClick={handleClose}
          >
            취소
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
              axios({
                url: "https://i7c203.p.ssafy.io/api/users",
                method: "delete",
                headers: { accessToken: token },
              }).then((res) => {
                handleShow2();
                sessionStorage.clear();
              });
            }}
          >
            삭제하기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
        className={styles.dialog}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
            PAZAMA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ "font-family": "oldpicture" }}>
          삭제가 완료되었습니다!
        </Modal.Body>
        <Modal.Footer>
          <Button
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
            확인
          </Button>
        </Modal.Footer>
      </Modal>

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
          회원정보 수정에 성공했습니다!
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              display: "none",
              border: "none",
              "font-family": "oldpicture",
              backgroundColor: "#9D9D9D",
              color: "white",
            }}
            onClick={handleClose3}
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
              document.location.href = "/";
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 비밀번호자릿수 */}
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
            onClick={handleClose4}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 비밀번호영문자혼합 */}
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
            onClick={handleClose5}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 비밀번호불일치 */}
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
            onClick={handleClose6}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 회원정보 수정 실패 */}
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
          회원정보 수정에 실패했습니다.
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuthUpdateForm;
