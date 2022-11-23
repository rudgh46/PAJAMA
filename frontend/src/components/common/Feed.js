import React, {useState, useEffect} from "react";
import styles from "./Feed.module.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from "styled-components";
import axios from "axios";

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
  background-color: #FDF1F3;
  font-family:"oldpicture";
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #fd7a99;
  }
`;

function Feed(props) {
  let [credentials, setCredentials] = useState({  roomIdx: props.roomIdx,  description: ""});
  let comment = props.comment;
  let [write, setWrite] = useState("")
  let pictures = props.pictures
  const roomIdx = props.roomIdx
  const token = sessionStorage.getItem('accessToken')
  const partyTime = props.partyTime
  
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    <>
    <div className={styles.feeds}>
      <div>
        <button className={styles.listbtn} onClick={handleShow}><img src="/list.png" style={{"width":"20px", "height":"20px"}}></img></button>
      </div>
      <br />
      <img src={pictures[0]} alt="대표사진" className={styles.picture} />
      <br />
      <div className={styles.comment}>
        <div className={styles.head}>
          <div className={styles.date}>{partyTime.substr(0,10)}</div>
          <div>

            <button className={styles.trashbtn} onClick={handleShow2}><img src="/trash.png" style={{"width":"20px", "height":"20px"}}></img></button>
          </div>
        </div>
        <div className={styles.comment}>{comment}</div>
      </div>
    </div>

    <Modal
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className={styles.dialog}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{'font-family':'star', "color":"#FD7A99"}}>PAZAMA</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>

        {  pictures.map((picture)=>(

          <img src={picture} alt="파티사진" className={styles.picture}></img>
        )
        ) 
        }
      </Modal.Body>
      <Modal.Footer>
      <StyledInput
          autoComplete="comment"
          name="comment"
          placeholder=" How was the Party?"
          onInput={(event) => {
            setWrite(event.target.value);
          }}
        />
        <Button 
        style={{'color':'black', 'backgroundColor':'#FFA4BD', 'border':'none','font-family':'oldpicture', 'box-shadow':'none' }} 
        onClick={()=>{
          setCredentials((credentials.description = write))
          console.log(credentials)
          axios({
            url: "https://i7c203.p.ssafy.io/api/mypage",
            method:"post",
            headers: {accessToken : token},
            data:credentials,
          })
            .then((res) => {
              document.location.href='/mypage'
              console.log(res.data);
            })
            .catch((err)=>{console.log(err)})

        }}>작성하기</Button>
      </Modal.Footer>
    </Modal>

    <Modal
      centered
      show={show2}
      onHide={handleClose2}
      backdrop="static"
      keyboard={false}
      className={styles.dialog}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{'font-family':'star', "color":"#FD7A99"}}>PAZAMA</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{'font-family':'oldpicture'}}>
        해당 피드를 삭제하시겠습니까?
      </Modal.Body>
      <Modal.Footer>
      <Button 
        style={{'color':'white', 'backgroundColor':'#9D9D9D', 'border':'none','font-family':'oldpicture', 'box-shadow':'none' }} 
        onClick={handleClose2}>취소</Button>
        <Button 
        style={{'color':'black', 'backgroundColor':'#FD7A99', 'border':'none','font-family':'oldpicture', 'box-shadow':'none' }}
        onClick={() => {
          axios({
            url: `https://i7c203.p.ssafy.io/api/mypage`,
            method: "delete",
            headers: { accessToken: token },
            data: {
              email: roomIdx,
            },
          }).then((res) => {
            document.location.href = "/mypage";
          });
        }}
        >삭제하기</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default Feed;
