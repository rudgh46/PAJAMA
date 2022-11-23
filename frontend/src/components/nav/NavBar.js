import React, {useState} from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #ffe9ef;
  padding: 0px 30px;
  font-size: 18px;

  a {
    font-family: "star";
    text-decoration: none;
    color: black;
  }

  .header__menulist {
    display: flex;
    list-style: none;
    padding-left: 0px;
    padding-top: 10px;
    
  }
  .header__menulist li {
    padding: 8px 12px;
  }
  .nav_menu :hover {
    color: #fd7a99;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: none;
    }

    .header__menulist li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }
  }
`;

const NavBar = () => {
  const [isToggled, setIsToggled] = useState(false);

  let token = sessionStorage.getItem("accessToken");
  return (
    <Header isToggled={isToggled}>
      <logo>
        <a href="/">
          <img
            src="/pazamafont.png"
            alt="logo"
            width="150px"
            height="75px"
          ></img>
        </a>
      </logo>

      <div
        className="toggle"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
        <img src="/menu.png" style={{width:"30px", height:"30px"}}/>
      </div>

      <ul class="header__menulist">
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/guide">가이드</a>
        </li>
        {token !== "undefined" && token ? (
          <>
            <li>
              <a href="/mypage">마이페이지</a>
            </li>
            <li>
              <a
                href="/"
                onClick={() => {
                  // sessionStorage.setItem("accessToken", "");
                  sessionStorage.clear();
                }}
              >
                로그아웃
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/register">회원가입</a>
            </li>
            <li>
              <a href="/login">로그인</a>
            </li>
          </>
        )}
      </ul>
    </Header>
  );
};

export default NavBar;
