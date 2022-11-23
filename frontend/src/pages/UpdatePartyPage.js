import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/nav/NavBar";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { ko } from "date-fns/esm/locale";
import "./UpdatePartyPage.css";
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const CreateBtn = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledBtn = styled.button`
  text-align: center;
  width: 200px;
  height: 70px;
  border: none;
  border-radius: 15px;
  font-size: 25px;
  font-weight: bold;
  font-family: "BRITANIC";
  outline: none;
  cursor: pointer;
  color: black;
  background: #fd7a99;
  &:hover {
    background: #ffa4bd;
  }
  margin: 2rem;
`;

const CreateFormBlock = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  margin-top: 2rem;
  margin-left: 5rem;
  h5 {
    margin: 0;
    color: black;
    font-family: "oldpicture";
    padding-bottom: 0.5rem;
  }
  .item1 {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .item2 {
    grid-column-start: 4;
    grid-column-end: 7;
  }
  .item3 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
  }
  .item4 {
    grid-column-start: 1;
    grid-column-end: 7;
    grid-row-start: 3;
    grid-row-end: 5;
  }
  .item5 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 7;
  }
  .item6 {
    grid-column-start: 4;
    grid-column-end: 7;
    grid-row-start: 5;
    grid-row-end: 7;
  }
`;

const StyledInput = styled.input`
  border-radius: 10px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ffe9ef;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  outline: none;
  width: 100%;
  display: flex;
  background-color: #fdf1f3;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #fd7a99;
  }
`;

const StyledTextArea = styled.textarea`
  border-radius: 10px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ffe9ef;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  outline: none;
  width: 100%;
  display: flex;
  background-color: #fdf1f3;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #fd7a99;
  }
  margin-bottom: 2rem;
`;

const Pinkbox = styled.div`
  padding: 2rem;
  width: 100%;
  height: 80%;
  background: #fdf1f3;
  border-radius: 10px;
`;

const UpdatePartyPage = () => {
  let { roomIdx } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("성공적으로 복사되었습니다!");
  }
  const [roomId, setRoomId] = useState("");

  const [myEmail, setMyEmail] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partyDesc, setPartyDesc] = useState("");
  const [partyDate, setPartyDate] = useState(new Date());
  const [partyBg, setPartyBg] = useState(null);
  const [partyCake, setPartyCake] = useState(null);
  const [partyCandle, setPartyCandle] = useState(null);
  useEffect(() => {
    console.log("배경은 -> " + partyBg);
  }, [setPartyBg]);
  let token = sessionStorage.getItem("accessToken");
  useEffect(() => {
    axios({
      url: "https://i7c203.p.ssafy.io/api/rooms",
      method: "get",
      headers: { accessToken: token },
      params: {
        roomIdx: roomIdx,
      },
    })
      .then((res) => {
        console.log(roomIdx);
        console.log("방정보 불러오기 성공");
        console.log(res);
        console.log(res.data.result.partyName);
        setMyEmail(res.data.result.partyHost);
        setPartyName(res.data.result.partyName);
        setPartyDesc(res.data.result.partyDesc);
        // setPartyDate(res.data.result.partyDate);

        setPartyBg(res.data.result.partyBg);
        setPartyCake(res.data.result.partyCake);
        setPartyCandle(res.data.result.partyCandle);

        console.log(partyName);
      })
      .catch(() => {
        document.location.href = "/NotFound";
      });
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <div class="container">
        <CreateFormBlock>
          <div class="item1">
            <h5>파티 이름</h5>
            <StyledInput
              name="partyName"
              value={partyName}
              onInput={(e) => {
                setPartyName(e.target.value);
              }}
              autoComplete="partyname"
              placeholder=" PARTY NAME"
            />
          </div>
          <div class="item2">
            <h5>날짜 선택</h5>
            <DatePicker
              className="pointer"
              selected={partyDate}
              onChange={(date) => setPartyDate(date)}
              value={partyDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Time"
              dateFormat="yyyy/MM/dd eee, aa h:mm"
              locale={ko}
              minDate={new Date()}
              customInput={
                <Form.Control
                  as="textarea"
                  rows={1}
                  style={{ width: "250px" }}
                />
              }
            />
          </div>
          <div class="item3">
            <h5>파티 내용</h5>
            <StyledTextArea
              onInput={(e) => {
                setPartyDesc(e.target.value);
              }}
              value={partyDesc}
              autoComplete="partydetail"
              name="partydetail"
              placeholder=" PARTY DETAIL"
            />
          </div>
          <div class="item4">
            <h5>배경 선택</h5>

            <Pinkbox className="d-flex justify-content-around">
              {partyBg === 0 ? (
                <input
                  checked
                  type="radio"
                  name="back"
                  id="back0"
                  className="input-hidden"
                />
              ) : (
                <input
                  type="radio"
                  name="back"
                  id="back0"
                  className="input-hidden"
                />
              )}

              <label className="itemBox" for="back0">
                <img
                  className="pointer"
                  src="/frame1.png"
                  style={{ width: "250px" }}
                  onClick={() => {
                    setPartyBg(0);
                  }}
                ></img>
                <FiCheckCircle id="itemImg" className="backCheckIcon" />
              </label>

              {partyBg === 1 ? (
                <input
                  checked
                  type="radio"
                  name="back"
                  id="back1"
                  className="input-hidden"
                />
              ) : (
                <input
                  type="radio"
                  name="back"
                  id="back1"
                  className="input-hidden"
                />
              )}

              <label className="itemBox" for="back1">
                <img
                  className="pointer"
                  src="/frame2.png"
                  style={{ width: "250px" }}
                  onClick={() => {
                    setPartyBg(1);
                  }}
                ></img>
                <FiCheckCircle id="itemImg" className="backCheckIcon" />
              </label>

              {partyBg === 2 ? (
                <input
                  checked
                  type="radio"
                  name="back"
                  id="back2"
                  className="input-hidden"
                />
              ) : (
                <input
                  type="radio"
                  name="back"
                  id="back2"
                  className="input-hidden"
                />
              )}

              <label className="itemBox" for="back2">
                <img
                  className="pointer"
                  src="/frame3.png"
                  style={{ width: "250px" }}
                  onClick={() => {
                    setPartyBg(2);
                  }}
                ></img>
                <FiCheckCircle id="itemImg" className="backCheckIcon" />
              </label>
            </Pinkbox>
          </div>
          <div class="item5">
            <h5>케이크 선택</h5>
            <Pinkbox className="d-flex justify-content-between">
              {partyCake === 0 ? (
                <input
                  checked
                  type="radio"
                  name="cake"
                  id="cake0"
                  className="input-hidden"
                />
              ) : (
                <input
                  type="radio"
                  name="cake"
                  id="cake0"
                  className="input-hidden"
                />
              )}

              <label className="itemBox" for="cake0">
                <img
                  className="pointer"
                  src="/cake1.png"
                  style={{ width: "160px" }}
                  onClick={() => {
                    setPartyCake(0);
                  }}
                ></img>
                <FiCheckCircle id="itemImg" className="cake0CheckIcon" />
              </label>

              {partyCake === 1 ? (
                <input
                  checked
                  type="radio"
                  name="cake"
                  id="cake1"
                  className="input-hidden"
                />
              ) : (
                <input
                  type="radio"
                  name="cake"
                  id="cake1"
                  className="input-hidden"
                />
              )}
              <label className="itemBox" for="cake1">
                <img
                  className="pointer"
                  src="/cake2.png"
                  style={{ width: "160px" }}
                  onClick={() => {
                    setPartyCake(1);
                  }}
                ></img>
                <FiCheckCircle id="itemImg" className="cake1CheckIcon" />
              </label>
            </Pinkbox>
          </div>
          <div class="item6">
            <h5>초 선택</h5>
            <Pinkbox className="d-flex justify-content-around align-items-center">
              {partyCandle === 0 ? (
                <input
                  checked
                  type="radio"
                  name="candle"
                  id="candle0"
                  className="input-hidden"
                />
              ) : (
                <input
                  type="radio"
                  name="candle"
                  id="candle0"
                  className="input-hidden"
                />
              )}
              <label className="itemBox" for="candle0">
                <img
                  className="pointer"
                  src="/candle1.png"
                  style={{ width: "100px", height: "130px" }}
                  onClick={() => {
                    setPartyCandle(0);
                  }}
                ></img>
                <FiCheckCircle id="itemImg" className="candle0CheckIcon" />
              </label>

              {partyCandle === 1 ? (
                <input
                  checked
                  type="radio"
                  name="candle"
                  id="candle1"
                  className="input-hidden"
                />
              ) : (
                <input
                  type="radio"
                  name="candle"
                  id="candle1"
                  className="input-hidden"
                />
              )}
              <label className="itemBox" for="candle1">
                <img
                  className="pointer"
                  src="/candle2.png"
                  style={{ width: "100px", height: "130px" }}
                  onClick={() => {
                    setPartyCandle(1);
                  }}
                ></img>
                <FiCheckCircle id="itemImg" className="candle1CheckIcon" />
              </label>
              {partyCandle === 2 ? (
                <input
                  checked
                  type="radio"
                  name="candle"
                  id="candle2"
                  className="input-hidden"
                />
              ) : (
                <input
                  type="radio"
                  name="candle"
                  id="candle2"
                  className="input-hidden"
                />
              )}
              <label className="itemBox" for="candle2">
                <img
                  className="pointer"
                  src="/candle3.png"
                  style={{ width: "100px", height: "130px" }}
                  onClick={() => {
                    setPartyCandle(2);
                  }}
                ></img>
                <FiCheckCircle id="itemImg" className="candle2CheckIcon" />
              </label>
            </Pinkbox>
          </div>
        </CreateFormBlock>
      </div>
      <div class="container"></div>
      <CreateBtn>
        {/* <a href='/room'> */}
        <StyledBtn
          onClick={() => {
            handleShow();
            if (!(token == "" || token == undefined)) {
              setPartyDate(partyDate.setHours(partyDate.getHours() + 9));
              axios({
                url: "https://i7c203.p.ssafy.io/api/rooms",
                method: "put",
                headers: { accessToken: token },
                params: {
                  roomIdx: roomIdx,
                },
                data: {
                  partyName: partyName,
                  partyDesc: partyDesc,
                  partyBg: partyBg,
                  partyCake: partyCake,
                  partyCandle: partyCandle,
                  partyDate: partyDate,
                },
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              alert("로그인을 해주세요");
            }
          }}
        >
          UPDATE PARTY
        </StyledBtn>
        {/* </a> */}
      </CreateBtn>

      <Modal
        centered
        show={show}
        onHide={handleClose}
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
          수정이 완료되었습니다.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              color: "white",
              backgroundColor: "#9D9D9D ",
              border: "none",
              "font-family": "oldpicture",
              "box-shadow": "none",
            }}
            onClick={() => {
              document.location.href = `/room/${roomIdx}`;
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePartyPage;
