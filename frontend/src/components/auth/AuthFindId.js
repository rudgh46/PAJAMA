import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const AuthFindId = () => {
  const [show1, setShow1] = useState(false); //아이디찾기 성공
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false); //아이디찾기 실패
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  let [FindId, setFindId] = useState("");

  let [tel, setTel] = useState("");

  return (
    <AuthFormBlock>
      <h3>아이디 찾기</h3>
      <form>
        <StyledInput
          autoComplete="tel"
          name="tel"
          placeholder="전화번호"
          onInput={(event) => {
            setTel(event.target.value);
          }}
        />

        <ButtonWithMarinTop
          fullWidth
          onClick={(e) => {
            e.preventDefault();

            axios({
              url: "https://i7c203.p.ssafy.io/api/users/findEmail",
              method: "get",
              params: { tel: tel },
            })
              .then((res) => {
                console.log(res.data.result);
                setFindId(res.data.result);
                handleShow1();
              })
              .catch(() => {
                handleShow2();
              });
          }}
        >
          아이디 찾기
        </ButtonWithMarinTop>
      </form>
      <Footer>
        <Link to="/findId" className="link">
          아이디찾기
        </Link>
        <span>|</span>
        <Link to="/findPwd" className="link">
          비밀번호찾기
        </Link>
        <span>|</span>
        <Link to="/register" className="link">
          회원가입
        </Link>
      </Footer>
      {/* 아이디찾기 성공 */}
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
          가입된 이메일은 {FindId} 입니다.
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

      {/* 아이디찾기 실패 */}
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
          전화번호를 확인해주세요.
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
    </AuthFormBlock>
  );
};

export default AuthFindId;
