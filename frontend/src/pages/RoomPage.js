import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import styles from "./RoomPage.module.css";
import OpenVideo from "../components/openvidu/OpenVideo";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Header = styled.div`
  display: grid;
  grid-template-columns: 10% 10% 10% 10%;
  justify-content: space-around;
  text-align: center;
  background-color: #ffe9ef;
  img {
    margin-top: 10px;
  }
  height: 70px;
  padding: 3px;
`;

const StyledBtn = styled.button`
  color:black;
  width: 100px;
  height: 70px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  background: none;
  &:hover {
    background: #ffa4bd;
  }
`;

const RoomPage = () => {
  const [token, setToken] = useState(sessionStorage.getItem("accessToken"));
  const [partyDate, setPartyDate] = useState(new Date());
  const [flag, setFlag] = useState(false);
  let { roomIdx } = useParams();
  console.log(roomIdx);
  useEffect(() => {
    console.log(token);
  }, [flag]);

  axios({
    url: "https://i7c203.p.ssafy.io/api/rooms",
    method: "get",
    headers: { accessToken: token },
    params: {
      roomIdx: roomIdx, // params
    },
  })
    .then((res) => {
      setPartyDate(res.data.result.partyDate);
      console.log(res.data.result.partyDate);
    })
    .catch(() => {
      document.location.href = "/NotFound";
    });
  var dday = new Date(partyDate).getTime();
  const interval = setInterval(function () {
    var today = new Date().getTime();
    var gap = dday - today;
    var day = Math.ceil(gap / (1000 * 60 * 60 * 24) - 1);
    var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) - 1);
    var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60) - 1);
    var sec = Math.ceil((gap % (1000 * 60)) / 1000 - 1);

    console.log(day + " " + hour + " " + min + " " + sec);

    if (!isNaN(day) && !(!day == null) && day != -1) {
      document.getElementById("counter").innerHTML =
        "D-" +
        day.toString().padStart(2, "0") +
        " : " +
        hour.toString().padStart(2, "0") +
        " : " +
        min.toString().padStart(2, "0") +
        " : " +
        sec.toString().padStart(2, "0");
    }
    if (day == 0 && hour == 0 && min == 0 && sec == 0) {
      setFlag(true);
      if (document.getElementById("bu").hasChildNodes() === false && flag) {
        var btn = document.createElement("button");
        btn.innerHTML = "참여하기";
        btn.className = "joinbtn";
        document.getElementById("bu").appendChild(btn);
      }
      document.getElementById("counter").innerHTML = "D-00 : 00 : 00 : 00";
      clearInterval(interval);
    } else if (day == -1) {
      clearInterval(interval);
      setFlag(true);
      if (document.getElementById("bu").hasChildNodes() === false && flag) {
        var btn = document.createElement("button");
        btn.innerHTML = "참여하기";
        btn.className = "joinbtn";
        document.getElementById("bu").appendChild(btn);
      }
      document.getElementById("counter").innerHTML = "D-00 : 00 : 00 : 00";
    }
  }, 1000);

  return (
    <>
      <div>
        <OpenVideo
          roomIdx={encodeURIComponent(roomIdx)}
          partyDate={partyDate}
          flag={flag}
        />
      </div>
    </>
  );
};

export default RoomPage;
