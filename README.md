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

API_SERVER_PORT=3000

# DB 설정
DB_USER=
DB_HOST=
DB_PORT=
DB_NAME=
DB_PASSWORD=


# JWT 설정
JWT_SECRET=


# Redis 설정
REDIS_URL=redis://redis:6379/0


# 날씨 API Key 설정
WEATHER_API_KEY=


# Gemini Key 설정
GEN_AI_API_KEY=


# Firebase 설정
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_CERT_URL=
FIREBASE_CLIENT_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=
```

## 계층 구조 (작성 예정)

```Express

X_BOARD_PROJECT
│
├── node_modules/            # 설치된 외부 라이브러리
├── src/                     # 소스코드 루트
│   ├── api/                 # 각 도메인 기능별 API 구성
│   │   ├── auth/            # 인증/로그인
│   │   │   ├── auth-controller.js
│   │   │   ├── auth-model.js
│   │   │   ├── auth-routes.js
│   │   │   └── auth-service.js
│   │   ├── device/                # 장치 정보 관리
│   │   ├── device-checklist/     # 장치 점검표
│   │   ├── device-management/    # 장치 관리(관리자 전용)
│   │   ├── device-unit/          # 장치 단위
│   │   ├── maintenance/          # 유지보수 기록
│   │   ├── pdf/                  # PDF 관련 API
│   │   ├── qr-code/              # QR 코드 관련 기능
│   │   ├── sensor-data/          # 센서 수집 데이터 (chart.js를 보여주기 위한 데이터)
│   │   ├── sos/                  # SOS 요청 처리 (SOS 알림 전송)
│   │   ├── user/                 # 사용자 관리
│   │   └── weather/              # 오늘 날씨 정보 요청
│   │
│   ├── caches/                  # 임시 캐시 저장 로직
│   │   └── latest-sensor-cache.js
│   │
│   ├── config/                  # 환경 설정 및 초기화
│   │   ├── config.js            # env 전체 설정
│   │   ├── db.js                # DB 커넥션 설정
│   │   ├── firebase-admin.js    # firebase 설정
│   │   └── redis.js             # Redis 설정
│   │
│   ├── features/               # 복합 기능 및 서브 모듈
│   │   ├── gemini-ai/
│   │   │   └── services/
│   │   │       └── gemini-client.js    # gemini AI 외부 요청 클라이언트
│   │   ├── replace-alarm/
│   │   │   ├── models/
│   │   │   │   └── replace-alarm-model.js
│   │   │   ├── services/
│   │   │   │   └── replace-alarm-service.js   # 장비 교체 서비스
│   │   │   └── replace-alarm-scheduler.js
│   │   └── weather-ai/
│   │       ├── models/
│   │       │   └── weatherAI-model.js
│   │       ├── services/
│   │       │   ├── weatherAI-service.js       # 날씨 캐스터 서비스
│   │       │   └── weatherAPI-client.js       # 날씨 외부 API 요청 클라이언트
│   │       └── weather-ai-scheduler.js
│   │
│   ├── middlewares/           # 미들웨어 (인증, 권한 체크 등)
│   │   ├── auth-middleware.js      # 사용자 인증 확인
│   │   └── authorize-admin.js      # 관리자 인증 확인
│   │
│   ├── notification/          # 알림 (Firebase 등)
│   │   └── firebase-sender.js
│   │
│   ├── templates/             # PDF 또는 기타 템플릿 리소스
│   │   └── (폰트 파일들, report.pdf 등)
│   │
│   ├── utils/                 # 공통 유틸 함수들
│   │   ├── replace-alarm/
│   │   │   └── replace-alarm-utils.js
│   │   ├── weather-ai/
│   │   │   ├── date-utils.js
│   │   │   └── weather-utils.js
│   │   ├── pdf-utils.js
│   │   ├── token-utils.js
│   │   ├── validate-device-unit.js
│   │   └── validate-maintenance.js
│   │
│   ├── view-routes/           # 차트 관련 View API 라우터
│   │   ├── chart-view-routes.js
│   │   └── chart2-view-routes.js
│   │
│   ├── views/                 # 서버 측 렌더링용 EJS 템플릿
│   │   ├── chart.ejs
│   │   └── chart2.ejs
│   │
│   ├── websocket/             # WebSocket 관련 구성
│   │   ├── event-types.js
│   │   ├── index.js
│   │   └── socket-emitter.js
│   │
│   ├── app.js                 # Express 앱 초기화
│   ├── routes.js              # API 라우트 초기 구성
│   ├── server.js              # 서버 실행 시작점
│   └── view-routes.js         # 뷰 전용 라우터 엔트리
│
├── .env                       # 환경 변수 파일
├── .gitignore
├── Dockerfile                 # Docker 설정
├── package.json
├── package-lock.json
└── README.md

```
