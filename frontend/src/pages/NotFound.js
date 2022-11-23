import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  text-align: center;
  width: 200px;
  height: 60px;
  border: none;
  border-radius: 15px;
  font-size: 25px;
  font-weight: bold;
  font-family: "star";
  outline: none;
  cursor: pointer;
  background: #fd7a99;
  margin: 2rem;
  color: black;
  &:hover {
    background: #ffa4bd;
  }

  @media only screen and (max-width: 1165px) {
    font-size: 20px;
    width: 150px;
    height: 40px;
  }

  @media only screen and (max-width: 940px) {
    font-size: 18px;
    width: 150px;
    height: 40px;
  }
`;

// const Div = styled.div`
//   text-align: left;
//   margin-top: 50px;
//   margin-left: 100px;
// `;

function NotFound() {
  return (
    <div>
      <div>
        <img src="/errorpageimg.png" style={{display:"flex",margin:"auto", 'width':"50%", 'marginBottom':"50px"}} />
      </div>
      <div>
        <StyledBtn
          onClick={() => {
            document.location.href = "/";
          }}
          style={{margin:"auto", display:"flex", 'justifyContent':"center", 'alignItems':"center"}}
        >
          홈으로 이동
        </StyledBtn>
      </div>
    </div>
  );
}

export default NotFound;
