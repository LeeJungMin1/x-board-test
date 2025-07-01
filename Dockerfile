FROM node:20.19.2-slim

# 기본 패키지 설치 (ffmpeg 포함, 빌드 도구도 함께 설치 권장)
RUN apt update && apt install -y curl openssl ca-certificates iputils-ping

# 앱 작업 디렉토리
WORKDIR /app

# package.json 복사 후 설치
COPY package*.json ./
RUN npm install

# 전체 앱 복사
COPY . .

# 앱 실행
CMD ["node", "src/server.js"]