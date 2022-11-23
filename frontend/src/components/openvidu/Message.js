import React, { Component } from "react";
import styled from "styled-components";

const Username = styled.p`
  color: #fd7a99;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0px;
`;

const MessageContainer = styled.div`
  width: 90%;
`;

const Text = styled.p`
  font-size: 1rem;
  background-color: white;
  border-radius: 10px;
  word-break: break-all;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  width: 70%;
  float: left;

  margin-top: 0px;
  margin-bottom: 0px;
`;

const MyUsername = styled.p`
  color: #a07dff;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: right;
  margin: 0px;
`;

const MyMessageContainer = styled.div`
  width: 90%;
`;

const MyText = styled.p`
  font-size: 1rem;
  background-color: #ffa4bd;
  border-radius: 10px;
  word-break: break-all;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 0px;
  width: 70%;
  float: right;
`;

class Message extends Component {
  render() {
    const { text, userName, myUserName } = this.props;

    return (
      <>
        {userName === myUserName ? (
          <MyMessageContainer>
            <MyText>{text}</MyText>
          </MyMessageContainer>
        ) : (
          <MessageContainer>
            <Username>{userName}</Username>
            <Text>{text}</Text>
          </MessageContainer>
        )}
      </>
    );
  }
}

export default Message;
