import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./InvitePage.css";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import styled from "styled-components";

const Header = styled.div`
  text-align: center;
  background-color: #ffe9ef;
`;

const InvitePage = () => {
  let token = sessionStorage.getItem("accessToken");
  let [partyNickname, setPartyNickname] = useState("");
  let [partyName, setPartyName] = useState("");
  let [partyDesc, setPartyDesc] = useState("");
  let [partyDate, setPartyDate] = useState("");
  let { roomIdx } = useParams();
  let [validURL, setValidURL] = useState("");
  let date = new Date(partyDate);
  let dateMDY = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;

  useEffect(() => {
    axios({
      url: "https://i7c203.p.ssafy.io/api/rooms",
      method: "get",
      headers: { accessToken: token },
      params: { roomIdx: roomIdx },
    }).then((res) => {
      console.log("success");

      setValidURL(encodeURIComponent(roomIdx));
      console.log(validURL);
      console.log(res.data.result);
      setPartyNickname(res.data.result.partyNickname);
      setPartyName(res.data.result.partyName);
      setPartyDesc(res.data.result.partyDesc);
      setPartyDate(res.data.result.partyDate);
    });
  }, []);

  return (
    <>
      <MobileView>
        {token !== "undefined" && token ? (
          <>
            <a href="/" className="letterheader">
              <img
                className="headerlogo"
                src="/pazamafont.png"
                alt="logo"
                width="120px"
                height="60px"
              ></img>
            </a>
            <p className="Main">{partyNickname}님의 파티에 초대받으셨습니다!</p>
            <div className="partyinfo">
              <p
                style={{
                  color: "#FD7A99",
                  fontSize: "large",
                  fontWeight: "bold",
                }}
              >
                {partyName}
              </p>
              <p>{partyDesc}</p>
              <div className="dateMDY">{dateMDY}</div>
              <p> 파자마에서 만나요!</p>
            </div>
            <div className="lettercontainer">
              <img
                src="/letter.png"
                style={{ width: "60%", height: "60%", maxWidth: "1024px" }}
              ></img>
            </div>
            <a href={`/room/${validURL}`} className="clicklink">
              JOIN PARTY
            </a>
          </>
        ) : (
          <>
            <a href="/" className="letterheader">
              <img
                className="headerlogo"
                src="/pazamafont.png"
                alt="logo"
                width="120px"
                height="60px"
              ></img>
            </a>
            <p className="Main">PAJAMA 파티에 초대받으셨습니다!</p>
            <div className="lettercontainer">
              <img
                src="/letter.png"
                style={{ width: "60%", height: "60%", maxWidth: "1024px" }}
              ></img>
            </div>
            <a href={`/login/${validURL}`} className="clicklink">
              로그인이 필요합니다!
            </a>
          </>
        )}
      </MobileView>

      <BrowserView>
        <Header>
          <a href="/">
            <img
              src="/pazamafont.png"
              alt="logo"
              width="120px"
              height="60px"
            ></img>
          </a>
        </Header>
        {token !== "undefined" && token ? (
          <>
            <p className="Main2">
              {partyNickname}님의 파티에 초대받으셨습니다!
            </p>
            <div className="partyinfo2">
              <p
                style={{
                  color: "#FD7A99",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                {partyName}
              </p>
              <p>{partyDesc}</p>
              <div className="dateMDY2">{dateMDY}</div>
              <p> 파자마에서 만나요!</p>
            </div>
            <div className="lettercontainer2">
              <img
                src="/letter.png"
                style={{ width: "20%", height: "20%" }}
              ></img>
            </div>
            <a
              href={`/room/${validURL}`}
              onClick={() => {
                axios({
                  url: `https://i7c203.p.ssafy.io/api/participant`,
                  method: "post",
                  headers: { accessToken: token },
                  data: {
                    roomIdx: roomIdx,
                  },
                }).then((res) => {
                  console.log("success");
                });
              }}
              className="clicklink"
            >
              JOIN PARTY
            </a>
          </>
        ) : (
          <>
            <p className="Main">PAJAMA 파티에 초대받으셨습니다!</p>
            <div className="lettercontainer2">
              <img
                src="/letter.png"
                style={{ width: "20%", height: "20%" }}
              ></img>
            </div>
            <a href={`/login/${validURL}`} className="clicklink">
              로그인이 필요합니다!
            </a>
          </>
        )}
      </BrowserView>
    </>
  );
};

export default InvitePage;
