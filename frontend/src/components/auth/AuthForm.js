import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Button from "../common/Button";
import axios from "axios";
import { useState } from "react";
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
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
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

const Footer = styled.div`
    display: felx;
    justify-content: center;
    margin-top: 1rem;
    font-family: 'oldpicture';
    a {
        color : #9D9D9D;
        text-decoration: none;
        &:hover{
            color: #FD7A99}
        }

    }
    .link {
      margin-right: 5px;
      margin-left: 5px;
    }
    span {
      color : #9D9D9D;
    }

`;

const ButtonWithMarinTop = styled(Button)`
  margin-top: 1rem;
`;

const AuthForm = () => {
  let { roomIdx } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  roomIdx = encodeURIComponent(roomIdx);
  let [credentials, setCredentials] = useState({ email: "", pwd: "" });
  let [userEmail, setUserEmail] = useState("");
  let [password, setPassword] = useState("");
  //   let [userid, setUserid] = useState({ id: "" });
  //   setUserid(userid.id="11")
  return (
    <AuthFormBlock>
      <h3>로그인</h3>
      <form>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="이메일"
          onInput={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        <StyledInput
          autoComplete="current-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onInput={(event) => {
            setPassword(event.target.value);
          }}
        />

        <ButtonWithMarinTop
          fullWidth
          onClick={(e) => {
            e.preventDefault();

            setCredentials((credentials.email = userEmail));
            setCredentials((credentials.pwd = password));
            axios({
              url: "https://i7c203.p.ssafy.io/api/auth/login",
              method: "post",
              data: credentials,
            })
              .then((res) => {
                console.log(res.data);
                if (res.data.accessToken === undefined) {
                  handleShow();
                  // document.location.href = "/login";
                } else {
                  sessionStorage.setItem("accessToken", res.data.accessToken);
                  if (roomIdx == undefined || roomIdx == "undefined") {
                    document.location.href = "/";
                  } else {
                    document.location.href = `/invite/${roomIdx}`;
                  }
                }
              })
              .catch(() => {
                handleShow();
                console.log("로그인 실패");
              });
          }}
        >
          로그인
        </ButtonWithMarinTop>
      </form>
      <Footer>
        <Link to="/findId" className="link">
          아이디찾기
        </Link>
        <span>|</span>
        <Link to="/findpwd" className="link">
          비밀번호찾기
        </Link>
        <span>|</span>
        <Link to="/register" className="link">
          회원가입
        </Link>
      </Footer>
      {show ? (
        <Modal
          centered
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title style={{ "font-family": "star", color: "#FD7A99" }}>
              PAZAMA
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ "font-family": "oldpicture", "font-size": "20px" }}
          >
            이메일 또는 비밀번호를 잘못 입력했습니다.
            <br />
            입력하신 내용을 다시 확인해주세요.
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
                if (roomIdx == undefined || roomIdx == "undefined") {
                  document.location.href = "/login";
                } else {
                  document.location.href = `/login/${roomIdx}`;
                }
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </AuthFormBlock>
  );
};

export default AuthForm;
