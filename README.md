# 🛰️ X-BOARD-API Server

Flask Server(iot_monitoring_system)이 실시간으로 받은 센서 데이터를 기반으로 X-Board App과 X-Board Web을 위한 Express API Server 입니다.
Flask Server와 Redis와 PostgreSQL을 공유하고 있습니다.

---

## 📦 주요 기능 (작성 예정)

- ✅

---

## 🔧 설치 방법

```bash
npm install
```

## 🔧 Docker로 실행 방법

```bash
.env 설정 후

# docker compose 내용 ( Flask server + Express server + Redis + Celery + PostgreSQL )

docker compose -f docker-compose.dev.yml up -d
```

```bash
# .env 설정

# Node 모드 설정 (production , dev)  production : 운영모드 / dev : 개발모드
NODE_ENV=dev

# DB 설정
DB_USER=
DB_HOST=
DB_PORT=
DB_NAME=
DB_PASSWORD=

# JWT 설정
JWT_SECRET=

# Redis 설정
REDIS=redis://redis:6379/0
```

## 계층 구조 (작성 예정)

```Express


```
