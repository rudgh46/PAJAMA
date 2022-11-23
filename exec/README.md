# PAJAMA 포팅매뉴얼

## 버전

### IDE 버전

- IntelliJ IDEA 2022.1.2
- VS Code 18.3.5

### 서버 버전

- Ubuntu 20.04.4
- Gradle 7.4.1
- Tomcat 9.0.64
- openjdk:11.0.15.1
- node:16.16.0

## 배포 방법

### Openvidu 배포

- 오픈비두 설치

```
sudo su
cd /opt
curl <https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh> | bash
```

- 클라이언트 사이드와 통신하기 위한 설정

```
$ cd openvidu
$ nano .env

# OpenVidu configuration
# ----------------------
# 도메인 또는 퍼블릭IP 주소
DOMAIN_OR_PUBLIC_IP=i7c203.p.ssafy.io

# 오픈비두 서버와 통신을 위한 시크릿
OPENVIDU_SECRET=SECRETKEY

# Certificate type
CERTIFICATE_TYPE=letsencrypt

# 인증서 타입이 letsencrypt일 경우 이메일 설정
LETSENCRYPT_EMAIL=user@example.com

# HTTP port
HTTP_PORT=8446

# HTTPS port(해당 포트를 통해 오픈비두 서버와 연결)
HTTPS_PORT=8447

```

- 오픈비두 서버 실행

`$ ./openvidu start`

### Backend 및 Frontend 빌드 및 배포

- 설치
    
    ```
    #ngninx 설치
    sudo apt-get install nginx
    
    #letsencrypst 설치
    sudo apt-get install letsencrypt
    sudo systemctl stop nginx
    sudo letsencrypt certonly --standalone -d 도메인이름
    
    ```
    
- backend/Dockerfile
    
    ```
    FROM openjdk:11-jdk
    VOLUME /tmp 
    ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
    COPY ${JAR_FILE} app.jar 
    EXPOSE 8082
    ENTRYPOINT ["java","-jar","/app.jar"]
    ```
    
- frontend/Dockerfile
    
    ```
    FROM node:16.16.0
    WORKDIR /usr/src/app
    COPY package.json ./
    RUN npm install
    COPY ./ ./
    EXPOSE 3000
    CMD ["npm","run","start"]
    ```
    
- etc/nginx/sites-enabled/pajama.conf
    
    ```
    server {
      listen 80;  
      
      server_name i7c203.p.ssafy.io; 
      return 301 https://i7c203.p.ssafy.io$request_uri;
    }
    server {
      listen 443 ssl http2;
      server_name i7c203.p.ssafy.io;
    
      # ssl 인증서 적용하기
      ssl_certificate /etc/letsencrypt/live/i7c203.p.ssafy.io/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/i7c203.p.ssafy.io/privkey.pem;
      
      location / { 
        proxy_pass http://i7c203.p.ssafy.io:3000;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
      }
    
    	#백엔드 API
      location /api/ {
        proxy_pass http://i7c203.p.ssafy.io:8082/;
      }
    
    	#Express.js 이미지 서버
      location /image/ {
        proxy_pass http://i7c203.p.ssafy.io:3003/;
      }
    
    	#업로드된 이미지 접근
      location /images/ {
        alias /home/ubuntu/image_server/uploads/;
      }
    }
    server {
        if ($host = i7c203.p.ssafy.io) {
            return 301 https://$host$request_uri;
        }
    
        listen 80;
        server_name i7c203.p.ssafy.io;
          return 404; # managed by Certbot
    }
    ```
    
    - nginx 설치 후 심볼릭 링크 생성
        - `sudo ln -s /etc/nginx/sites-available/test.conf /etc/nginx/sites-enabled`
    - nginx재실행
        - `sudo service nginx restart`
- 젠킨스 Build시 bash 실행
    
    ```
    cd backend
    chmod +x ./gradlew
    ./gradlew clean build
    docker build -t pajama_be:0.0.1 ./
    cd ../frontend
    docker build -t pajama_fe:0.0.1 ./
    cd ..
    docker kill pajama_fe_container
    docker kill pajama_be_container
    docker system prune -f
    docker run -d -p 8082:8082 --name pajama_be_container pajama_be:0.0.1
    docker run -d -p 3000:3000 --name pajama_fe_container pajama_fe:0.0.1
    ```


### 이미지서버 빌드 및 배포
- 이미지서버 복사 후 빌드
  
  ```
  #배포된 디렉토리에 있는 이미지서버 폴더를 로컬 디렉토리로 복사
  cp -r ./image_server /home/ubuntu/image_server
  cd /home/ubuntu/image_server
  npm i
  #이미지 서버 빌드
  forever start
  ```
