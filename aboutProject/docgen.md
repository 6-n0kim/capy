# 🧠 DocGen — AI 기반 프로젝트 문서 자동 생성 플랫폼

> **요구사항 정의서, 기능 명세서, 정책 정의서까지 AI가 자동으로 생성·관리하는 통합 문서 시스템**

---

## 🧭 프로젝트 개요

| 항목              | 내용                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **프로젝트명**    | DocGen                                                                                                      |
| **기간**          | 2024.07 – 2024.11 (4개월)                                                                                   |
| **팀 구성**       | 총 4인 (모두 **Backend + Frontend** 개발 참여)                                                              |
| **프로젝트 목표** | AI를 활용해 프로젝트 문서를 자동으로 생성·관리하며, 협업 효율성과 문서 품질을 동시에 향상시키는 시스템 구축 |
| **핵심 가치**     | “사람이 쓰던 문서를 AI가 대신 쓴다 — 효율적이고 일관된 문서 자동화 플랫폼”                                  |

---

## 💡 문제 정의

프로젝트 진행 중 다음과 같은 비효율이 존재:

- 요구사항 정의서, 기능 명세서, 정책 문서를 사람이 수동 작성 → **시간 소모 & 일관성 저하**
- 문서 형식이 팀마다 달라 **프로젝트 관리 효율 저하**
- 버전 관리 및 수정 이력 추적의 어려움

➡️ **DocGen**은 AI가 자동으로 문서를 작성하고, 협업 가능한 프로젝트 단위로 관리할 수 있도록 설계되었다.

---

## ⚙️ 기술 스택 및 선택 이유

| 구분                | 기술                                           | 선택 이유                                        |
| ------------------- | ---------------------------------------------- | ------------------------------------------------ |
| **Frontend**        | React, TypeScript, Vite, Zustand, Tailwind CSS | 반응형 SPA 구조와 경량 상태관리, 빠른 개발 속도  |
| **Backend (Core)**  | NestJS, TypeORM, PostgreSQL                    | 안정적인 ORM 기반 서버 구조와 관계형 데이터 관리 |
| **AI Backend**      | FastAPI, LangChain, CrewAI, MongoDB            | LLM 기반 AI 문서 생성 파이프라인 구현에 최적화   |
| **Infra/Deploy**    | Docker, Jenkins, Gunicorn                      | 배포 자동화 및 서비스 확장성 확보                |
| **Auth/Security**   | JWT, Passport.js, Bcrypt, Pydantic             | 안전한 인증·입력 검증 구조                       |
| **Document Export** | ExcelJS, openpyxl                              | 생성된 문서를 Excel로 내보내기 가능              |
| **API Docs**        | Swagger, FastAPI Docs                          | 자동화된 API 명세 제공                           |

---

## 🧩 시스템 아키텍처

```text
[사용자]
   ↓
React SPA (Vite, Zustand)
   ↓
NestJS (Auth, Project, Document 관리)
   ↓
FastAPI (AI 문서 생성)
   ↓
MongoDB / PostgreSQL

분리형 백엔드 구조

NestJS: 인증·프로젝트 관리

FastAPI: AI 문서 생성 및 Excel 변환

AI 문서 생성 파이프라인

LangChain + OpenAI + Gemini + Claude 모델 동시 지원

CrewAI로 에이전트 기반 문서 생성 단계화 (질문 → 목록 → 상세 → 요약)


## 디렉토리 구조
```

docgen/
├── frontend/ # React 기반 프론트엔드
│ ├── src/ # 컴포넌트·스토어·API 구조
│ └── deploy/ # Docker/Jenkins 설정
│
├── backend/ # NestJS 기반 백엔드
│ ├── src/modules/ # Authentication, Project, Document 등 도메인 모듈
│ └── config/ # DB, JWT, Swagger 설정
│
└── fastapi/ # FastAPI 기반 AI 문서 생성 서버
├── ai/ # LLM 및 문서 생성기
├── api/endpoints/ # 문서 생성 API
├── schemas/ # Pydantic 데이터 모델
└── utility/ # Excel 생성 유틸

```

🤖 AI 문서 생성 구조
AI Agent 역할별 분화
DocumentGenerator:
  ├── QuestionGenerator  # 초기 질문 생성
  ├── ListGenerator      # 요구사항/기능 목록 생성
  ├── DetailGenerator    # 상세 내용 생성
  ├── SummaryGenerator   # 요약 생성
  └── RoleGenerator      # 역할 정의 (정책 문서용)

  생성 플로우
요구사항 입력
    ↓
QuestionGenerator → 초기 질문 생성
    ↓
ListGenerator → 요구사항 목록 작성
    ↓
DetailGenerator → 상세 항목 구체화
    ↓
SummaryGenerator → 핵심 요약 작성
    ↓
RoleGenerator → 정책 문서 역할 정의
    ↓
최종 MongoDB 저장 및 Excel 변환
```
