# 🏋️‍♀️ FIT HARMONY — 헬스장 통합 운영 및 회원 관리 플랫폼

> **트레이너와 회원, 그리고 헬스장을 하나로 연결하는 통합 플랫폼**

---

## 🧭 프로젝트 개요

| 항목              | 내용                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **프로젝트명**    | FIT HARMONY                                                                                               |
| **기간**          | 2024.08 – 2024.11 (약 4개월)                                                                              |
| **팀 구성**       | 총 4인 (모두 **Backend + Frontend** 개발 참여)                                                            |
| **공통 역할**     | 백엔드 API 설계 및 구현 / 프론트엔드 UI·상태 관리 / DB 설계 및 배포 환경 구성                             |
| **프로젝트 목표** | 헬스장 회원·트레이너·운영자를 연결하여 인바디 관리, 일정 조율, 커뮤니티, 상품 결제까지 한 플랫폼에서 해결 |

---

## 💡 문제 정의

헬스장 운영에서는 다음과 같은 비효율이 존재:

- 트레이너와 회원 간 **일정 조율 및 인바디 관리가 수기로 이루어짐**
- 회원 관리 시스템과 커뮤니티가 **분리되어 있어 소통이 단절**
- 트레이너별 고객 데이터를 효율적으로 추적할 수 없음

👉 이를 해결하기 위해 **운영·소통·데이터를 통합한 플랫폼 “FIT HARMONY”** 를 개발하였음.

---

## ⚙️ 기술 스택 및 선택 이유

| 구분              | 기술                                      | 선택 이유                                                  |
| ----------------- | ----------------------------------------- | ---------------------------------------------------------- |
| **Frontend**      | React (Vite), Redux Toolkit, Tailwind CSS | SPA 기반 빠른 렌더링, 전역 상태 관리 및 반응형 디자인 용이 |
| **Backend**       | Node.js (Express), PostgreSQL             | 경량 서버 환경과 안정적인 관계형 DB 구조                   |
| **Auth**          | Passport.js (Local + Google OAuth2.0)     | 로그인/세션 통합 관리, 확장성 높은 인증 구조               |
| **AI/OCR**        | Python + PaddleOCR + OpenAI API           | 인바디 이미지 분석 자동화 및 GPT 기반 건강 피드백          |
| **Infra**         | Vite Build + Tomcat/Express 배포          | 프론트-백 분리형 배포 구조                                 |
| **State Mgmt**    | Redux Toolkit + Context API               | 인증 및 비동기 상태 전역 관리                              |
| **Visualization** | Recharts, FullCalendar                    | 인바디 및 일정 데이터 시각화                               |
| **Security**      | Helmet, express-session, SHA-512          | 안전한 세션 인증 및 암호화 처리                            |

---

## 🧠 시스템 아키텍처

```text
[사용자]
   ↓
React SPA (Vite, Redux)
   ↓
Axios 통신
   ↓
Express.js API 서버
   ↓
PostgreSQL (RDB)
   ↓
Python (OCR, GPT 분석)
```

- 세션 기반 인증 구조: Passport.js + connect-pg-simple
- 역할별 접근 제어 (RBAC): ADMIN / TRAINER / MEMBER
- AI 연동: Node.js에서 Python 스크립트를 호출하여 인바디 데이터 자동 분석

---

## 🗂️ 주요 기능

| 구분              | 기능                            | 기술적 특징                             |
| ----------------- | ------------------------------- | --------------------------------------- |
| **회원 관리**     | 로그인, 회원가입, 프로필 수정   | Local/Google OAuth 인증, SHA-512 암호화 |
| **트레이너 기능** | 회원 관리, 일정, 상품 등록/판매 | 역할 기반 권한 부여, PostgreSQL 연동    |
| **인바디 분석**   | OCR + GPT 분석 리포트           | PaddleOCR + OpenAI API 연동             |
| **일정 관리**     | FullCalendar 일정 뷰, 식단 관리 | Redux 상태관리 + date-fns               |
| **커뮤니티**      | 게시글·댓글 CRUD, 관리자 기능   | React Router + API CRUD 통합            |
| **상품 관리**     | 트레이너별 상품 등록·구매 기능  | RESTful 설계 기반 API                   |

---

## 🧩 백엔드 구조

```
back/
├── config/              # DB, 인증, 업로드 설정
├── controllers/         # 도메인별 비즈니스 로직
│   ├── inbody/          # OCR, GPT 분석 로직 포함
│   ├── trainer/         # 트레이너 관리, 상품 판매
│   ├── schedule/        # 일정 관리
│   └── community/       # 커뮤니티 게시판
├── routes/              # 라우팅 정의
├── utils/               # 공통 유틸리티
├── public/              # 업로드된 정적 파일
└── index.js             # 서버 엔트리 포인트
```

- 인증: Passport.js(Local/Google), 세션 기반 관리
- AI/OCR: Python subprocess 호출 → OCR/GPT 결과 JSON 반환
- 보안 강화: Helmet, httpOnly 쿠키, RBAC 권한 제어

---

## 🎨 프론트엔드 구조

```
front/
├── src/
│   ├── components/       # 도메인별 React 컴포넌트
│   ├── js/               # Redux, API, Context 관리
│   ├── css/              # Tailwind + Custom CSS
│   └── images/           # 리소스 이미지
└── vite.config.js
```

- Vite + React Router DOM으로 빠른 페이지 전환
- Redux Toolkit으로 도메인 단위 상태 분리 (inbody, schedule, community 등)
- Context API로 인증 및 전역 모달 관리
- Recharts / FullCalendar / Framer Motion 으로 시각적 완성도 강화

---

## 📊 성과 및 개선점

| 항목                            | 결과                                      |
| ------------------------------- | ----------------------------------------- |
| **API 안정성**                  | 평균 응답속도 1.2s / 오류율 0.8%          |
| **인바디 분석 자동화**          | OCR 정확도 약 90% 이상                    |
| **Redux 전환 후 렌더링 최적화** | 불필요한 리렌더링 40% 감소                |
| **UI 반응속도**                 | Vite + Tailwind로 초기 로딩 시간 50% 단축 |

---

## 🤝 협업 방식

- 모든 팀원 (4명): 프론트엔드·백엔드 전 영역을 Full-stack 역할로 수행
- GitHub Flow 기반 브랜치 전략 (main / feature / hotfix)
- Notion으로 일정 및 API 명세 공유
- 회의 주기: 주 2회 (스프린트 리뷰 + 코드 리뷰)

## 🧾 문서화 및 유지보수

- README / API 명세 / ERD / 요구사항명세서 / FLOW CHART 등 문서화 완료
- 코드 품질 관리: ESLint + Prettier + SonarLint
- 배포 환경: .env 기반 환경 변수 관리 (노출 차단)
