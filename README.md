# 🎉 PAJAMA

---

## ✨ 팀 소개

- 김준우 : 팀장, 백엔드, WebRTC 구현, 서버 담당
- 김경호 : 백엔드, 모션인식, 음성인식 담당
- 김유완 : 백엔드, Entity 설계 및 API 구현, Jira관리자
- 이동주 : 프론트엔드
- 정재철 : 프론트엔드
- 진주현 : 프론트엔드

## 💡기획배경

파자마 서비스 기획 배경은 코로나 장기화로부터 시작되었습니다.

코로나 직 후에는 비대면 생활이 매우 생소하였지만 현재는 코로나 장기화로 온라인 화상 회의, 강의등이 활성화 되었으며 이런 비대면 서비스가 익숙해졌고 다양하게 사용되고 있습니다.

그 중 저흰 파티라는 테마를 선택하여 날씨,공간의 제약 없이 언제든지 파티를 할 수 있는 서비스를 기획하게 되었습니다.

## ⭐프로젝트 핵심 기능

### WebRTC

![파자마_설명2](/uploads/8b4bf79f68422d10a2d1326aff9365f7/파자마_설명2.png)

### 모션인식

- 모션 인식을 통한 폭죽 효과

![KakaoTalk_20220817_155957074](/uploads/bfa21173f591cef51f0c4d799cebe149/KakaoTalk_20220817_155957074.gif)

- 모션 인식을 통한 촛불 끄기

![KakaoTalk_20220817_165807081](/uploads/ef80141941272189f44bd23a002b7cb4/KakaoTalk_20220817_165807081.gif)

- 모션 인식 ( 하트 )

![ezgif-4-bba324d641](/uploads/87b1def736bf75c7522618ff71e7a770/ezgif-4-bba324d641.gif)

- 모션 인식 ( 브이 )

![ezgif-4-7a9e4914d9](/uploads/53abc83022f199195512993a9c489c10/ezgif-4-7a9e4914d9.gif)

- 모션 인식 ( 일 모양 )

![ezgif-4-5b35591b16](/uploads/05b0ece377adeb141327f1c6d1fcbfc7/ezgif-4-5b35591b16.gif)

### 음성인식(Speech-to-Text)

- 음성 인식을 통해 음악 재생

## 👌 프로젝트 상세 설명

## ERD

![Untitled](/uploads/2cbdc2b6923ea334c3d2ba3e1f147fa8/Untitled.png)

## ⌨️ 기술스택

![파자마로고작업2](/uploads/a38f463a177d32f35560d46c151aea14/파자마로고작업2.png)

### Server-side

- Spring Boot 2.7.1 + JPA + Gradle
- AWS
- KMS (Kurento Media Server)
- Docker
- Jenkins
- Nginx
- Node.js (express.js)
- JWT Authentication
- My SQL 8.0.30

### Client-side

- React.js 18.2.0
- Redux 4.2.0
- Node.js 16.16.0
- React Bootstrap
- Openvidu

### 주요 API

- Tensorflow.js
- Web Speech Api
- WebSocket
- REST API

### 협업툴

- Gitlab
- Jira
- Notion
- Mattermost
- Webex
- Figma
- Draw.io

## 🔨 Git 컨벤션

```bash
# FEAT : 새로운 기능 추가
# FIX : 버그 수정
# DOCS : 문서 수정
# DATA : DataSet, 단순 데이터 관련 사항
# DB : 데이터베이스 관련 사항
# TEST : 테스트 코드 추가
# REFACTOR : 코드 리팩토링
# STYLE : 코드 의미에 영향을 주지 않는 변경사항
# CHORE : 빌드 부분 혹은 패키지 매니저 수정사항
# DIR : 디렉토리 관련 변경사항 (추가/삭제/수정)
# DEL : 삭제
# ETC : 기타
# Ex) [FEAT][A-01] : 회원가입 구현
################
# ! : 필요
# Ex) !FIX : 버그 수정 필요, !FEAT : 기능 추가 필요, !DOCS : 문서화, 문서 수정 필요
# HOT : 급한 작업(우선 순위 작업)
# Ex) !HOTFIX : 긴급 버그 수정 필요
# * : 두 가지 이상의 태그가 필요할 때 (권장하지 않음 - 되도록 따로따로 커밋 부탁드립니다.)
# Ex) [FEAT] * [DIR] : 회원가입 구현, 디렉토리 변경 XXX.Java
```

## 배포
[바로가기](https://lab.ssafy.com/s07-webmobile1-sub1/S07P11C203/-/blob/master/exec/README.md)

## 💻서비스 화면

### 메인 페이지

![Untitled](/uploads/df7a65772f6e32764bff301eb85d09af/Untitled.png)

![Untitled](/uploads/509751547de6ae917477f1b2dc644797/Untitled.png)

![Untitled](/uploads/4c97a933e0cbd551abdd3bc10749e594/Untitled.png)

![Untitled](/uploads/c76af47e533158bdc8446bac8be10a99/Untitled.png)

### 회원가입 및 로그인

- 회원가입 ( 본인 인증을 위해 이메일 인증번호 전송 )

![KakaoTalk_20220817_165806635](/uploads/2f10390159ac20f3904f4edc84d4cafc/KakaoTalk_20220817_165806635.gif)

- 로그인 , 비밀번호 초기화 ( 이메일을

![Untitled](/uploads/6440987cfd7e3a93540db2729b9be542/Untitled.png)

- 아이디 찾기 ( 전화번호를 통해 아이디의 일부를 보여줌 )
- 

![KakaoTalk_20220817_165806745](/uploads/9067766183dbaadabcbf821ba0852d49/KakaoTalk_20220817_165806745.gif)

- 비밀번호 찾기 ( 이메일을 통해 새로운 비밀번호를 제공함 )

![KakaoTalk_20220817_165806880](/uploads/c0c3d909c89c460a9f60f782e1ae9f21/KakaoTalk_20220817_165806880.gif)

### 파티룸 생성

![파티생성](/uploads/3227209878f5ffc49ac5f2e118bf1db5/파티생성.gif)

### 화상 미팅룸 및 그룹 채팅

- 채팅 화면

![KakaoTalk_20220817_145651357](/uploads/266bb670186fd528db78fb75ae64fe14/KakaoTalk_20220817_145651357.png)

### 음악재생

### 사진촬영

### 마이페이지

- 참여한 파티 별로 찍었던 사진을 확인할 수 있음

![Untitled](/uploads/c7c6aaa5874e6df5f2ba46c8c8f6fc2e/Untitled.png)

- 여러 사진과 피드 내용 수정, 피드 삭제 가능

![Untitled](/uploads/ed2c61de282f6923f6d0b68d95879156/Untitled.png)
