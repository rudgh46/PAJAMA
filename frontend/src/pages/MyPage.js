import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import Feed from "../components/common/Feed";
import styles from "./MyPage.module.css";
import Button from "../components/common/Button";
import axios from "axios";

function MyPage() {
  let token = sessionStorage.getItem("accessToken");
  let [nickname, setNickname] = useState("");
  let [roomInfo, setRoomInfo] = useState({});
  let [keys, setKeys] = useState([]);

  useEffect(() => {
    axios({
      url: "https://i7c203.p.ssafy.io/api/users/me",
      method: "get",
      headers: { accessToken: token },
    })
      .then((res) => {
        setNickname(res.data.result.nickname);
      })
      .catch(() => {
        document.location.href = "/NotFound";
      });
  }, []);

  useEffect(() => {
    axios({
      url: "https://i7c203.p.ssafy.io/api/mypage",
      method: "get",
      headers: { accessToken: token },
    })
      .then((res) => {
        setRoomInfo(res.data.result);
        setKeys(Object.keys(res.data.result));
        setLoading(false);
      })
      .then(() => {
        console.log(roomInfo);
        console.log(keys);
      })
      .catch((err) => {
        document.location.href = "/NotFound";
      });
  }, []);

  const [loading, setLoading] = useState(true);
  // const [feeds, setFeeds] = useState([]);
  // const getMovies = async () => {
  //   const json = await (
  //     await fetch(
  //       `https://yts.mx/api/v2/list_movies.jsonminimum_rating=8.5&sort_by=year`
  //     )
  //   ).json();
  //   setFeeds(json.data.movies);
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   getMovies();
  // }, []);
  // var hasFeed = Object.keys(feeds).length > 0;

  const navigate = useNavigate();
  function moveUpdate() {
    navigate("/mypage/update");
  }
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <header>
          <div className={styles.header}>
            <span className={styles.userName}>{nickname}의 Party</span>
            <Button className={styles.link} onClick={moveUpdate}>
              회원정보수정
            </Button>
          </div>
        </header>
        <div className={styles.feedContainer}>
          {loading ? (
            <div className={styles.loader}>
              <span>Loading...</span>
            </div>
          ) : (
            <div className={styles.feeds}>
              {keys.map((room) => (
                <Feed
                  roomIdx={room}
                  comment={roomInfo[room].comment}
                  pictures={roomInfo[room].picture}
                  partyTime={roomInfo[room].time}
                />
              ))}
            </div>
          )}
        </div>
        {keys.length === 0 ? (
          <div className={styles.emptycontainer}>
            <a className={styles.text1}>파티를 만들어보세요!</a>
            <br></br>
            <br></br>
            <Button
              onClick={() => {
                document.location.href = "/createparty";
              }}
            >
              CREATE PARTY
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default MyPage;
