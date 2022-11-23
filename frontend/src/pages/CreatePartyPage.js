import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/nav/NavBar";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { ko } from "date-fns/esm/locale";
import "./CreatePartyPage.css";
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BrowserView, MobileView } from "react-device-detect";

const CreateBtn = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledBtn = styled.button`
  color: black;
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

const CreateFormBlockMobile = styled.div`
  justify-content: center;
  margin-top: 2rem;
  h5 {
    margin: 0;
    color: black;
    font-family: "oldpicture";
    padding-bottom: 0.5rem;
  }

  .item2 {
    margin-bottom: 2rem;
  }
  .item3 {
    margin-bottom: 2rem;
  }
  .item4 {
    margin-bottom: 2rem;
  }
  .item5 {
    margin-bottom: 2rem;
  }

  .itemBox {
    margin-bottom: 1rem;
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
  margin-bottom: 2rem;
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

const CreatePartyPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

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

  let token = sessionStorage.getItem("accessToken");
  useEffect(() => {
    axios({
      url: "https://i7c203.p.ssafy.io/api/users/me",
      method: "get",
      headers: { accessToken: token },
    })
      .then((res) => {
        setMyEmail(res.data.result.email);
        console.log("회원정보 불러오기 성공");
      })
      .catch(() => {
        document.location.href = "/NotFound";
      });
  }, []);
  return (
    <>
      <NavBar></NavBar>

      <BrowserView>
        <div class="container">
          <CreateFormBlock>
            <div class="item1">
              <h5>파티 이름</h5>
              <StyledInput
                onInput={(e) => {
                  setPartyName(e.target.value);
                }}
                autoComplete="partyname"
                name="partyname"
                placeholder=" PARTY NAME"
              />
            </div>
            <div class="item2">
              <h5>날짜 선택</h5>
              <DatePicker
                className="pointer"
                selected={partyDate}
                onChange={(date) => setPartyDate(date)}
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
                autoComplete="partydetail"
                name="partydetail"
                placeholder=" PARTY DETAIL"
              />
            </div>
            <div class="item4">
              <h5>배경 선택</h5>
              <Pinkbox className="d-flex justify-content-around">
                <input
                  type="radio"
                  name="back"
                  id="back0"
                  className="input-hidden"
                />
                <label className="itemBox" for="back0">
                  <img
                    alt="frame1"
                    className="pointer"
                    src="/frame1.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyBg(0);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="backCheckIcon" />
                </label>

                <input
                  type="radio"
                  name="back"
                  id="back1"
                  className="input-hidden"
                />
                <label className="itemBox" for="back1">
                  <img
                    className="pointer"
                    alt="frame2"
                    src="/frame2.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyBg(1);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="backCheckIcon" />
                </label>

                <input
                  type="radio"
                  name="back"
                  id="back2"
                  className="input-hidden"
                />
                <label className="itemBox" for="back2">
                  <img
                    className="pointer"
                    alt="frame3"
                    src="/frame3.png"
                    style={{ width: "100%" }}
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
                <input
                  type="radio"
                  name="cake"
                  id="cake0"
                  className="input-hidden"
                />
                <label className="itemBox" for="cake0">
                  <img
                    className="pointer"
                    alt="cake1"
                    src="/cake1.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyCake(0);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="cake0CheckIcon" />
                </label>

                <input
                  type="radio"
                  name="cake"
                  id="cake1"
                  className="input-hidden"
                />
                <label className="itemBox" for="cake1">
                  <img
                    className="pointer"
                    alt="cake2"
                    src="/cake2.png"
                    style={{ width: "80%" }}
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
                <input
                  type="radio"
                  name="candle"
                  id="candle0"
                  className="input-hidden"
                />
                <label className="itemBox" for="candle0">
                  <img
                    className="pointer"
                    alt="candle1"
                    src="/candle1.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyCandle(0);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="candle0CheckIcon" />
                </label>

                <input
                  type="radio"
                  name="candle"
                  id="candle1"
                  className="input-hidden"
                />
                <label className="itemBox" for="candle1">
                  <img
                    className="pointer"
                    alt="candle2"
                    src="/candle2.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyCandle(1);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="candle1CheckIcon" />
                </label>

                <input
                  type="radio"
                  name="candle"
                  id="candle2"
                  className="input-hidden"
                />
                <label className="itemBox" for="candle2">
                  <img
                    className="pointer"
                    alt="candle3"
                    src="/candle3.png"
                    style={{ width: "100%" }}
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
      </BrowserView>

      <MobileView>
        <div className="container" style={{ justifyContent: "center" }}>
          <CreateFormBlockMobile>
            <div class="item1">
              <h5>파티 이름</h5>
              <StyledInput
                onInput={(e) => {
                  setPartyName(e.target.value);
                }}
                autoComplete="partyname"
                name="partyname"
                placeholder=" PARTY NAME"
              />
            </div>

            <div class="item3">
              <h5>파티 내용</h5>
              <StyledTextArea
                onInput={(e) => {
                  setPartyDesc(e.target.value);
                }}
                autoComplete="partydetail"
                name="partydetail"
                placeholder=" PARTY DETAIL"
              />
            </div>

            <div class="item2">
              <h5>날짜 선택</h5>
              <DatePicker
                className="pointer"
                selected={partyDate}
                onChange={(date) => setPartyDate(date)}
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
                    style={{ width: "100%" }}
                  />
                }
              />
            </div>

            <div class="item4">
              <h5>배경 선택</h5>
              <Pinkbox className="block">
                <input
                  type="radio"
                  name="back"
                  id="back0"
                  className="input-hidden"
                />
                <label className="itemBox" for="back0">
                  <img
                    alt="frame1"
                    className="pointer"
                    src="/frame1.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyBg(0);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="backCheckIcon" />
                </label>

                <input
                  type="radio"
                  name="back"
                  id="back1"
                  className="input-hidden"
                />
                <label className="itemBox" for="back1">
                  <img
                    className="pointer"
                    alt="frame2"
                    src="/frame2.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyBg(1);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="backCheckIcon" />
                </label>

                <input
                  type="radio"
                  name="back"
                  id="back2"
                  className="input-hidden"
                />
                <label className="itemBox" for="back2">
                  <img
                    className="pointer"
                    alt="frame3"
                    src="/frame3.png"
                    style={{ width: "100%" }}
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
                <input
                  type="radio"
                  name="cake"
                  id="cake0"
                  className="input-hidden"
                />
                <label className="itemBox" for="cake0">
                  <img
                    className="pointer"
                    alt="cake1"
                    src="/cake1.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyCake(0);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="cake0CheckIcon" />
                </label>

                <input
                  type="radio"
                  name="cake"
                  id="cake1"
                  className="input-hidden"
                />
                <label className="itemBox" for="cake1">
                  <img
                    className="pointer"
                    alt="cake2"
                    src="/cake2.png"
                    style={{ width: "80%" }}
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
                <input
                  type="radio"
                  name="candle"
                  id="candle0"
                  className="input-hidden"
                />
                <label className="itemBox" for="candle0">
                  <img
                    className="pointer"
                    alt="candle1"
                    src="/candle1.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyCandle(0);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="candle0CheckIcon" />
                </label>

                <input
                  type="radio"
                  name="candle"
                  id="candle1"
                  className="input-hidden"
                />
                <label className="itemBox" for="candle1">
                  <img
                    className="pointer"
                    alt="candle2"
                    src="/candle2.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyCandle(1);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="candle1CheckIcon" />
                </label>

                <input
                  type="radio"
                  name="candle"
                  id="candle2"
                  className="input-hidden"
                />
                <label className="itemBox" for="candle2">
                  <img
                    className="pointer"
                    alt="candle3"
                    src="/candle3.png"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setPartyCandle(2);
                    }}
                  ></img>
                  <FiCheckCircle id="itemImg" className="candle2CheckIcon" />
                </label>
              </Pinkbox>
            </div>
          </CreateFormBlockMobile>
        </div>
      </MobileView>

      <CreateBtn>
        <StyledBtn
          onClick={() => {
            if (partyDate <= new Date()) {
              handleShow2();
            } else {
              handleShow();
              if (!(token == "" || token == undefined)) {
                setPartyDate(partyDate.setHours(partyDate.getHours() + 9));

                axios({
                  url: "https://i7c203.p.ssafy.io/api/rooms",
                  method: "post",
                  headers: { accessToken: token },
                  data: {
                    partyHost: myEmail,
                    partyName: partyName,
                    partyDesc: partyDesc,
                    partyBg: partyBg,
                    partyCake: partyCake,
                    partyCandle: partyCandle,
                    partyDate: partyDate,
                  },
                })
                  .then((res) => {
                    console.log(res.data.result.roomId);
                    setRoomId(res.data.result.roomId);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          }}
        >
          CREATE PARTY
        </StyledBtn>
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
          초대장이 생성되었습니다.
          <br></br>
          아래 링크를 복사해서 친구를 초대해 보세요.
          <div>
            <form>
              <textarea
                ref={textAreaRef}
                value={`https://i7c203.p.ssafy.io/invite/${roomId}`}
                style={{ width: "100%", height: "100%" }}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {document.queryCommandSupported("copy") && (
            <>
              <div>
                <Button
                  style={{
                    backgroundColor: "#Ffa4bd",
                    border: "none",
                    "font-family": "oldpicture",
                    "box-shadow": "none",
                  }}
                  onClick={() => {
                    document.location.href = `/invite/${roomId}`;
                  }}
                >
                  바로참여
                </Button>
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "#FD7A99",
                    border: "none",
                    "font-family": "oldpicture",
                    "box-shadow": "none",
                  }}
                  onClick={copyToClipboard}
                >
                  복사
                </Button>
              </div>
            </>
          )}
          <Button
            style={{
              color: "white",
              backgroundColor: "#9D9D9D ",
              border: "none",
              "font-family": "oldpicture",
              "box-shadow": "none",
            }}
            onClick={() => {
              document.location.href = "/";
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ "font-family": "star" }}>PAZAMA</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "font-family": "oldpicture", "font-size": "20px" }}
        >
          현재 시간보다 이후 시간을 선택해주세요.
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
            onClick={handleClose2}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePartyPage;
