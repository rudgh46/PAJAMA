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

![파자마_설명2](https://user-images.githubusercontent.com/97828427/203667780-f1404e00-5389-455c-a0c5-6814f6af6de5.png)

### 모션인식

- 모션 인식을 통한 폭죽 효과

![모션폭죽](https://user-images.githubusercontent.com/97828427/203667769-62ae26ec-8f4b-42c0-8001-4d5b16e319c1.gif)

- 모션 인식을 통한 촛불 끄기

![모션촛불](https://user-images.githubusercontent.com/97828427/203667766-3bab0412-4efb-42cb-9555-ec544a2cd79c.gif)

- 모션 인식 ( 하트 )

![모션하트](https://user-images.githubusercontent.com/97828427/203667772-683cf6ad-903b-422d-869f-6ee314b76a10.gif)

- 모션 인식 ( 브이 )

![모션v](https://user-images.githubusercontent.com/97828427/203667759-5bf6297c-e4cc-4528-826b-641a47b53ebb.gif)

- 모션 인식 ( 일 모양 )

![모션1](https://user-images.githubusercontent.com/97828427/203667751-1edec25a-0b58-4cf2-bb21-295c40c11a4c.gif)

### 음성인식(Speech-to-Text)

- 음성 인식을 통해 음악 재생

## 👌 프로젝트 상세 설명

## ERD

![ERD](https://user-images.githubusercontent.com/97828427/203667735-b8890b54-ee13-452f-b8e0-fbdda7981846.png)

## ⌨️ 기술스택

![아키텍처](https://user-images.githubusercontent.com/97828427/203667776-9e5e8f55-39d9-445b-b4f6-1f2726e21728.png)

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

[바로가기](/exec/README.md)

## 💻서비스 화면

### 메인 페이지

![메인페이지](https://user-images.githubusercontent.com/97828427/203667742-7c95a224-fa56-4d4f-8a46-2cd4499844f3.png)

![메인페이지2](https://user-images.githubusercontent.com/97828427/203667745-364a5919-42f4-43c3-acb4-d8ff7fcf8274.png)

![메인페이지3](https://user-images.githubusercontent.com/97828427/203667746-f54b4188-2b06-4b6a-a528-8e7255e1e041.png)

![메인페이지4](https://user-images.githubusercontent.com/97828427/203667748-2b58648e-7e7c-481f-93b3-2742392faa66.png)

### 회원가입 및 로그인

- 회원가입 ( 본인 인증을 위해 이메일 인증번호 전송 )

![회원가입](https://user-images.githubusercontent.com/97828427/203667786-cdbc68f3-fc5d-4684-ad28-f83ed6e56834.gif)

- 로그인 , 비밀번호 초기화 ( 이메일을

![로그인](https://user-images.githubusercontent.com/97828427/203667738-32b7bc7c-6fed-48b7-a8ea-41e2328db338.png)

- 아이디 찾기 ( 전화번호를 통해 아이디의 일부를 보여줌 )
-

![아이디 찾기](https://user-images.githubusercontent.com/97828427/203667777-a0422585-4fad-442a-85d7-7d7cf5ac5656.gif)

- 비밀번호 찾기 ( 이메일을 통해 새로운 비밀번호를 제공함 )

![비밀번호 찾기](https://user-images.githubusercontent.com/97828427/203667774-f26aa672-58f8-4db6-8860-e204198e0b7f.gif)

### 파티룸 생성

![파티생성](https://user-images.githubusercontent.com/97828427/203667784-23a032da-6356-4c83-a008-0da5b612eef0.gif)

### 화상 미팅룸 및 그룹 채팅

- 채팅 화면

![채팅화면](https://user-images.githubusercontent.com/97828427/203667778-21910052-612e-4613-b2db-a43bb19a7cce.png)

### 음악재생

### 사진촬영

### 마이페이지

- 참여한 파티 별로 찍었던 사진을 확인할 수 있음

![마이페이지](https://user-images.githubusercontent.com/97828427/203667741-e125441f-5378-48c4-ac85-fc5a268d35c9.png)

- 여러 사진과 피드 내용 수정, 피드 삭제 가능

![마이페이지 피드수정](https://user-images.githubusercontent.com/97828427/203667739-84a44021-b164-4841-9f2b-a172cc583cdc.png)
