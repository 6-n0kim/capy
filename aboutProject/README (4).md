# DocGen 프론트엔드

DocGen은 AI 기반 프로젝트 문서 자동 생성 플랫폼의 프론트엔드 애플리케이션입니다. React 기반의 SPA(Single Page Application)로 구축되었으며, 프로젝트 관리, 문서 생성, 타임라인 관리, 공지사항 등의 기능을 제공합니다.

## 📚 기술 스택

### 핵심 프레임워크 및 빌드 도구
- **React** `v19.1.1` - UI 라이브러리
- **React Router DOM** `v7.8.2` - 클라이언트 사이드 라우팅
- **Vite** `v7.1.2` - 빌드 도구 및 개발 서버
- **TypeScript** `v5.8.3` - 정적 타입 언어
- **Tailwind CSS** `v3.4.0` - 유틸리티 우선 CSS 프레임워크

### 상태 관리
- **Zustand** `v5.0.8` - 경량 상태 관리 라이브러리
- **Redux Toolkit** `v2.8.2` - 전역 상태 관리 (레거시)
- **React Redux** `v9.2.0` - React와 Redux 바인딩

### HTTP 통신 및 유틸리티
- **Axios** `v1.11.0` - HTTP 클라이언트
- **ExcelJS** `v4.4.0` - Excel 파일 생성 및 처리
- **XLSX** `v0.18.5` - Excel 파일 읽기/쓰기

### 데이터 테이블 및 편집기
- **Handsontable** `v16.0.1` - 스프레드시트 컴포넌트
- **@handsontable/react** `v16.0.1` - React용 Handsontable 래퍼

### 개발 도구
- **ESLint** `v9.33.0` - 코드 품질 검사
- **Prettier** `v3.6.2` - 코드 포맷팅
- **@vitejs/plugin-react** `v5.0.0` - React용 Vite 플러그인
- **PostCSS** `v8.5.6` - CSS 후처리기

## 📁 소스 구조

```
docgen-frontend/
├── dist/                          # 빌드 결과물
│   ├── assets/                   # 빌드된 정적 파일
│   └── index.html               # 빌드된 HTML
│
├── src/                          # 소스 코드
│   ├── main.tsx                 # 애플리케이션 진입점
│   ├── App.tsx                  # 루트 컴포넌트 (라우팅 정의)
│   │
│   ├── components/              # React 컴포넌트
│   │   ├── common/             # 공통 컴포넌트
│   │   │   ├── Modal.tsx       # 모달 컴포넌트
│   │   │   ├── ProtectedRoute.tsx  # 인증 보호 라우트
│   │   │   ├── Toast.tsx       # 토스트 알림
│   │   │   └── ToastContainer.tsx  # 토스트 컨테이너
│   │   │
│   │   ├── pages/              # 페이지 컴포넌트
│   │   │   ├── Authentication/ # 인증 관련 페이지
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── SignUpPage.tsx
│   │   │   │   ├── IdFindPage.tsx
│   │   │   │   └── PasswordFindPage.tsx
│   │   │   │
│   │   │   ├── document/       # 문서 관리 페이지
│   │   │   │   ├── page.tsx    # 문서 목록
│   │   │   │   ├── GenerateDocument.tsx  # 문서 생성
│   │   │   │   ├── DocumentVIewerPage.tsx  # 문서 뷰어
│   │   │   │   ├── documentListPage.tsx  # 프로젝트별 문서 목록
│   │   │   │   └── component/  # 문서 관련 컴포넌트
│   │   │   │       ├── DocumentList.tsx
│   │   │   │       ├── DocumentListItem.tsx
│   │   │   │       ├── documentQuestion.tsx
│   │   │   │       └── DocumentViewer.tsx
│   │   │   │
│   │   │   ├── project/        # 프로젝트 관리 페이지
│   │   │   │   ├── page.tsx    # 프로젝트 목록
│   │   │   │   ├── projectDetail.tsx  # 프로젝트 상세
│   │   │   │   └── ProjectCreateModal.tsx  # 프로젝트 생성 모달
│   │   │   │
│   │   │   ├── timeline/       # 타임라인 관리 페이지
│   │   │   │   ├── page.tsx    # 타임라인 목록
│   │   │   │   ├── timeline.tsx  # 타임라인 상세
│   │   │   │   └── TimelineCreateModal.tsx  # 타임라인 생성 모달
│   │   │   │
│   │   │   ├── Notice/         # 공지사항 페이지
│   │   │   │   ├── page.tsx    # 공지사항 목록
│   │   │   │   ├── NoticeDetail.tsx  # 공지사항 상세
│   │   │   │   └── NoticeCreateModal.tsx  # 공지사항 생성 모달
│   │   │   │
│   │   │   ├── Member/         # 회원 관리 페이지
│   │   │   │   ├── MembershipCancelModal.tsx
│   │   │   │   ├── MyPagePasswordModal.tsx
│   │   │   │   └── WithdrawModal.tsx
│   │   │   │
│   │   │   ├── dashboard.tsx   # 대시보드
│   │   │   ├── IntroPage.tsx   # 메인 페이지
│   │   │   └── MyPage.tsx      # 마이페이지
│   │   │
│   │   └── layouts/            # 레이아웃 컴포넌트
│   │       ├── header.tsx      # 헤더
│   │       ├── footer.tsx      # 푸터
│   │       └── sidebar.tsx     # 사이드바
│   │
│   ├── stores/                 # 상태 관리 (Zustand)
│   │   ├── index.ts           # 스토어 인덱스
│   │   ├── useAuthenticationStore.ts  # 인증 상태
│   │   ├── useProjectStore.ts  # 프로젝트 상태
│   │   ├── useTimelineStore.ts # 타임라인 상태
│   │   ├── useNoticeStore.ts   # 공지사항 상태
│   │   ├── useMemberStore.ts   # 회원 상태
│   │   ├── useModalStore.ts    # 모달 상태
│   │   └── useSidebarStore.ts  # 사이드바 상태
│   │
│   ├── api/                    # API 관련
│   │   ├── apiClient.ts        # Axios 클라이언트 설정
│   │   └── index.ts           # API 인덱스
│   │
│   ├── hooks/                  # 커스텀 훅
│   │   └── useToast.ts         # 토스트 훅
│   │
│   ├── types/                  # TypeScript 타입 정의
│   │   └── api.ts             # API 타입
│   │
│   ├── styles/                 # 스타일 파일
│   │   └── main.css           # 메인 스타일
│   │
│   ├── examples/               # 예제 코드
│   │   └── ApiClientUsageExample.tsx
│   │
│   ├── App.css                 # 앱 스타일
│   └── index.css               # 글로벌 스타일
│
├── public/                     # 정적 파일
│   ├── docgen-logo.svg        # 로고
│   └── *.jpg                  # 이미지 리소스
│
├── docs/                       # 문서
│   ├── docgen-front-api.yaml  # API 스펙
│   └── docgen.erd             # 데이터베이스 ERD
│
├── deploy/                     # 배포 설정
│   ├── dockerfile             # Docker 설정
│   └── Jenkinsfile            # Jenkins 설정
│
├── index.html                  # HTML 템플릿
├── vite.config.ts             # Vite 설정
├── tailwind.config.js         # Tailwind CSS 설정
├── postcss.config.js          # PostCSS 설정
├── eslint.config.js           # ESLint 설정
├── tsconfig.json              # TypeScript 설정
├── package.json               # 의존성 관리
└── README.md                  # 프로젝트 문서
```

### 주요 디렉토리 설명

#### `src/components/`
- 페이지별로 구분된 React 컴포넌트
- `common/` - 재사용 가능한 공통 컴포넌트
- `pages/` - 각 도메인별 페이지 컴포넌트
- `layouts/` - 헤더, 푸터, 사이드바 등 레이아웃 컴포넌트

#### `src/stores/`
- Zustand 기반 상태 관리
- 도메인별 스토어 분리 (인증, 프로젝트, 타임라인 등)
- TypeScript 타입 안전성 보장

#### `src/api/`
- Axios 기반 API 클라이언트
- 요청/응답 인터셉터 설정
- 에러 핸들링 및 로깅

## 🔄 기본적인 소스 플로우

### 1. 애플리케이션 초기화
```
main.tsx
  ├── React StrictMode 적용
  ├── Handsontable 스타일 임포트
  ├── 글로벌 CSS 임포트
  ├── App 컴포넌트 렌더링
  └── React 루트 생성
```

### 2. 앱 구조 및 라우팅
```
App.tsx
  ├── BrowserRouter 설정
  ├── Sidebar (사이드바)
  ├── Header (전역 헤더)
  ├── Routes (페이지 라우팅)
  │   ├── / → IntroPage (메인 페이지)
  │   ├── /login → LoginPage
  │   ├── /signup → SignUpPage
  │   ├── /dashboard → Dashboard
  │   ├── /projects → Project (프로젝트 목록)
  │   ├── /projects/:id → ProjectDetail
  │   ├── /timelines → Timeline (타임라인 목록)
  │   ├── /timelines/projects/:id → TimelineDetail
  │   ├── /documents → DocumentPage (문서 목록)
  │   ├── /documents/generate → GenerateDocument
  │   ├── /documents/viewer → DocumentViewerPage
  │   ├── /notices → Notices (공지사항 목록)
  │   ├── /notices/:id → NoticeDetail
  │   └── /mypage → MyPage
  └── Footer (전역 푸터)
```

### 3. 인증 플로우
```
사용자 접근
    ↓
useAuthenticationStore (Zustand)
    ↓
localStorage에서 토큰 확인
    ↓
토큰 존재 시 자동 사용자 정보 복원
    ↓
[인증 필요 페이지 접근 시]
    ↓
ProtectedRoute 컴포넌트
    ↓
미인증 상태 → 로그인 페이지 리다이렉트
인증 완료 → 페이지 접근 허용
```

### 4. API 요청 플로우
```
컴포넌트에서 apiClient 사용
    ↓
Axios 요청 인터셉터
    ↓
Authorization 헤더 자동 추가
    ↓
API 요청 실행
    ↓
응답 인터셉터에서 에러 처리
    ↓
성공: 데이터 반환
에러: ApiError 객체로 변환 후 throw
```

### 5. 상태 관리 플로우
```
컴포넌트
    ↓
useStore() 훅 사용
    ↓
Zustand Store
    ├── useAuthenticationStore (인증 상태)
    ├── useProjectStore (프로젝트 상태)
    ├── useTimelineStore (타임라인 상태)
    ├── useNoticeStore (공지사항 상태)
    └── useModalStore (모달 상태)
    ↓
액션 실행 → 상태 업데이트
    ↓
컴포넌트 자동 리렌더링
```

### 6. 문서 생성 플로우
```
문서 생성 페이지 접근
    ↓
프로젝트 정보 로드
    ↓
질문 생성 API 호출
    ↓
사용자 질문 답변 수집
    ↓
요구사항 문서 생성 API 호출
    ↓
백그라운드에서 AI 문서 생성
    ↓
문서 목록 페이지로 리다이렉트
```

### 7. Excel 파일 처리 플로우
```
Excel 다운로드 요청
    ↓
API에서 Excel 파일 스트림 받기
    ↓
Blob 객체로 변환
    ↓
download.js를 통한 파일 다운로드
    ↓
브라우저 다운로드 폴더에 저장
```

## 🚀 동작 방법

### 1. 환경 설정

#### 필수 요구사항
- **Node.js** v18 이상
- **npm** v8 이상

#### 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 정보를 입력합니다:

```bash
# 백엔드 API 도메인
VITE_BACKEND_LOCAL_URL=http://localhost:3100
VITE_BACKEND_DEV_URL=http://localhost:8000

# FastAPI 서버 도메인 (AI 문서 생성)
VITE_FASTAPI_URL=http://localhost:8000
```

### 2. 설치 및 실행

#### 의존성 설치
```bash
npm install
```

#### 개발 서버 실행
```bash
npm run dev
```

개발 서버가 시작되면 다음과 같이 표시됩니다:
```
VITE v7.1.2  ready in XXX ms

➜  Local:   http://localhost:8181/
➜  Network: http://192.168.x.x:8181/
```

#### 프로덕션 빌드
```bash
npm run build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

#### 프로덕션 프리뷰
```bash
npm run preview
```

### 3. 코드 품질 검사

#### ESLint 실행
```bash
npm run lint
```

#### Prettier 포맷팅
```bash
npm run format
```

### 4. 주요 페이지 접근 경로

| 경로 | 설명 | 인증 필요 |
|------|------|-----------|
| `/` | 메인 페이지 (소개) | ❌ |
| `/login` | 로그인 페이지 | ❌ |
| `/signup` | 회원가입 페이지 | ❌ |
| `/dashboard` | 대시보드 | ✅ |
| `/projects` | 프로젝트 목록 | ✅ |
| `/projects/:id` | 프로젝트 상세 | ✅ |
| `/timelines` | 타임라인 목록 | ✅ |
| `/timelines/projects/:id` | 프로젝트별 타임라인 | ✅ |
| `/documents` | 문서 목록 | ✅ |
| `/documents/generate` | 문서 생성 | ✅ |
| `/documents/viewer` | 문서 뷰어 | ✅ |
| `/notices` | 공지사항 목록 | ❌ |
| `/notices/:id` | 공지사항 상세 | ❌ |
| `/mypage` | 마이페이지 | ✅ |

## 🔧 주요 기능 설명

### 1. 인증 관리 (useAuthenticationStore)
- JWT 토큰 기반 인증 상태 관리
- 자동 토큰 갱신 및 사용자 정보 복원
- 로그인/로그아웃/회원가입 기능

### 2. 프로젝트 관리 (useProjectStore)
- 프로젝트 CRUD 작업
- 프로젝트별 문서 및 타임라인 관리
- 해시태그 기반 프로젝트 분류

### 3. 문서 생성 시스템
- AI 기반 요구사항 정의서 생성
- 질문-답변을 통한 요구사항 수집
- Excel 파일 다운로드 지원

### 4. 타임라인 관리 (useTimelineStore)
- 프로젝트별 타임라인 생성 및 관리
- 이벤트 기반 프로젝트 진행 추적

### 5. 공지사항 시스템 (useNoticeStore)
- 공지사항 CRUD 작업
- 페이지네이션 지원

### 6. 모달 관리 (useModalStore)
- 전역 모달 상태 관리
- 다양한 모달 컴포넌트 지원

## 🎨 스타일링 가이드

### Tailwind CSS 사용
- 유틸리티 클래스 기반 스타일링
- `tailwind.config.js`를 통한 커스텀 설정
- 반응형 디자인 (`sm:`, `md:`, `lg:` 등)

### Handsontable 스타일링
- `safelist`를 통한 Handsontable 클래스 보존
- 커스텀 테마 적용 가능

### 커스텀 CSS
- `src/styles/main.css` - 메인 스타일
- `src/App.css` - 앱 전용 스타일
- `src/index.css` - 글로벌 스타일

## 📝 개발 가이드

### 새로운 페이지 추가하기

1. **컴포넌트 생성** (`src/components/pages/`)
```tsx
// src/components/pages/example/ExamplePage.tsx
import { useAuthenticationStore } from '../../../stores';

export default function ExamplePage() {
  const { user, isAuthenticated } = useAuthenticationStore();

  return (
    <div className="p-6">
      <h1>Example Page</h1>
      {isAuthenticated && <p>Welcome, {user?.name}!</p>}
    </div>
  );
}
```

2. **라우트 등록** (`src/App.tsx`)
```tsx
import ExamplePage from './components/pages/example/ExamplePage';

<Routes>
  <Route path="/example" element={<ExamplePage />} />
</Routes>
```

3. **Zustand 스토어 추가** (필요시)
```typescript
// src/stores/useExampleStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ExampleState {
  data: any[];
  isLoading: boolean;
  fetchData: () => Promise<void>;
}

export const useExampleStore = create<ExampleState>()(
  devtools((set) => ({
    data: [],
    isLoading: false,
    fetchData: async () => {
      set({ isLoading: true });
      // API 호출 로직
      set({ isLoading: false });
    },
  }))
);
```

### API 요청 예시

```tsx
import { api } from '../api/apiClient';

function MyComponent() {
  const fetchData = async () => {
    try {
      const response = await api.get('/api/endpoint');
      console.log('성공:', response.data);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return <button onClick={fetchData}>데이터 가져오기</button>;
}
```

### Handsontable 사용 예시

```tsx
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();

function DataTable() {
  const data = [
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
  ];

  return (
    <HotTable
      data={data}
      colHeaders={true}
      rowHeaders={true}
      width="100%"
      height="400px"
    />
  );
}
```

## 🛡️ 보안 고려사항

- ✅ JWT 토큰 기반 인증 (localStorage 저장)
- ✅ CORS 설정으로 허용된 백엔드만 통신
- ✅ ProtectedRoute를 통한 인증 필요 페이지 접근 제어
- ✅ XSS 방지를 위한 React의 자동 이스케이핑
- ✅ 환경 변수로 민감 정보 관리 (.env)
- ✅ Axios 인터셉터를 통한 자동 에러 처리

## 🌐 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 📄 라이선스

UNLICENSED

## 👥 기여자

DocGen 개발팀

---

**DocGen** - AI 기반 프로젝트 문서 자동 생성 플랫폼
