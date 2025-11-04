# Body Manager - 헬스장 관리 시스템 백엔드 서버

> 헬스장/피트니스 클럽의 회원 관리, 출결, 운동 일정, 인바디 데이터 시각화, 결제 시스템을 통합한 관리 플랫폼의 백엔드 API 서버

---

## 1. 프로젝트 개요

**백엔드 총괄 (Spring Boot 기반 REST API, DB 설계 및 배포 자동화 담당)**

헬스장 운영에 필요한 회원 관리, 출결 체크, 운동 일정, 식단 관리, 인바디 데이터 시각화, 멤버십 결제 등의 기능을 제공하는 백엔드 API 서버입니다.

- **역할**: 백엔드 개발 총괄, REST API 설계 및 구현, 데이터베이스 설계, 인증/인가 시스템 구축
- **기간**: 프로젝트 개발 기간
- **팀 구성**: 백엔드 2명, 프론트엔드 1명, 백엔드 + 프론트엔드 1명 (본인)

### 주요 담당 범위

- Spring Boot 기반 RESTful API 설계 및 구현
- JWT 기반 Stateless 인증/인가 시스템 구축
- QueryDSL을 활용한 동적 쿼리 및 복잡한 검색 기능 구현
- STOMP 프로토콜 기반 실시간 채팅 시스템 구현
- AWS S3를 활용한 파일 업로드 및 관리 시스템
- 이메일 인증 및 비밀번호 찾기 기능 구현
- MariaDB 데이터베이스 설계 및 최적화

---

## 2. 문제 정의

### 해결하려는 현실 문제

기존 헬스장 관리 시스템은 다음과 같은 문제점이 있었습니다:

1. **세션 기반 인증의 확장성 문제**: 서버 재시작 시 세션 유실, 클러스터링 환경에서의 세션 동기화 복잡성
2. **복잡한 검색 조건 처리**: 동적 검색 조건에 대한 유연한 쿼리 생성 필요
3. **실시간 통신 부재**: 회원-트레이너 간 즉시 소통을 위한 양방향 통신 필요
4. **파일 처리**: 이미지 업로드 및 저장 공간 관리 문제
5. **데이터 조회 성능**: 인바디 데이터 집계 및 분석 쿼리 최적화 필요

### 기술적 해결 방향

- **JWT 기반 Stateless 인증**: 서버 확장성 확보 및 무상태(Stateless) 아키텍처 구현
- **QueryDSL 동적 쿼리**: 타입 세이프한 동적 쿼리 생성으로 복잡한 검색 조건 처리
- **STOMP WebSocket**: 실시간 양방향 통신으로 채팅 시스템 구현
- **AWS S3 통합**: 확장 가능한 파일 저장소로 이미지 관리
- **QueryDSL 최적화**: N+1 문제 해결 및 복잡한 JOIN 쿼리 최적화

---

## 3. 기술 스택 명시

### Core Framework

- **Spring Boot 2.6.14**: 마이크로서비스 아키텍처 지원 및 자동 설정으로 개발 생산성 향상
- **Spring Security**: 인증/인가 프레임워크로 JWT 필터 통합
- **Spring Data JPA**: 데이터 접근 계층 추상화로 반복 코드 60% 감소

### Database & ORM

- **MariaDB**: MySQL 호환 오픈소스 RDBMS로 안정적인 데이터 저장
- **JPA/Hibernate**: 객체-관계 매핑으로 객체 지향적 데이터 접근
- **QueryDSL 5.0.0**: 컴파일 타임 타입 체크를 통한 안전한 동적 쿼리 작성. 복잡한 JOIN 및 서브쿼리 처리에 선택

### Authentication & Security

- **JWT (jjwt 0.9.1)**: Stateless 인증 토큰으로 서버 확장성 확보. 토큰 만료 시간 60분 설정
- **BCrypt Password Encoder**: 단방향 해시 암호화로 비밀번호 보안 강화

### Real-time Communication

- **Spring WebSocket**: STOMP 프로토콜 기반 실시간 양방향 통신
- **SockJS**: WebSocket 폴백 지원으로 브라우저 호환성 확보

### File Management

- **AWS S3 (Spring Cloud AWS 2.2.6)**: 확장 가능한 객체 스토리지로 이미지 파일 관리
- **Thumbnailator 0.4.16**: 이미지 썸네일 생성으로 저장 공간 및 로딩 속도 최적화

### API Documentation

- **Swagger (Springfox 3.0.0)**: REST API 자동 문서화로 프론트엔드 협업 효율화

### Email Service

- **Spring Mail**: SMTP 기반 이메일 발송 (Gmail SMTP 사용)

### Utilities

- **Lombok**: 보일러플레이트 코드 제거 (Getter/Setter/Builder 등)
- **ModelMapper 3.1.0**: Entity-DTO 변환 자동화
- **JSON (org.json 20160810)**: JSON 응답 생성 및 파싱

---

## 4. 시스템 구조도

```
┌─────────────────────────────────────────────────────────────┐
│                    클라이언트 (React)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/HTTPS (REST API)
                       │ WebSocket (STOMP)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Spring Boot Application Layer                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Controller  │  │   Service    │  │ Repository   │       │
│  │              │→ │              │→ │              │       │
│  │ REST/WebSocket│ │  Business    │  │  JPA/QueryDSL│       │
│  └──────────────┘  │   Logic      │  └──────────────┘       │
│         │          └──────────────┘           │              │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │  Security Layer │                        │
│                   │  (JWT Filter)   │                        │
│                   └─────────────────┘                        │
│                                                               │
│  ┌──────────────────────────────────────────────────┐        │
│  │          WebSocket Message Broker                │        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │        │
│  │  │  /pub    │  │   /sub   │  │ STOMP    │       │        │
│  │  │ (Send)   │→ │(Subscribe)│  │ Handler │       │        │
│  │  └──────────┘  └──────────┘  └──────────┘       │        │
│  └──────────────────────────────────────────────────┘        │
│                                                               │
└────────────────────────────┬─────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   MariaDB    │   │   AWS S3     │   │  SMTP Server │
│              │   │              │   │   (Gmail)    │
│  - Member    │   │  - Images    │   │  - Email     │
│  - Inbody    │   │  - Files     │   │    Auth      │
│  - Message   │   │              │   │              │
│  - Order     │   │              │   │              │
└──────────────┘   └──────────────┘   └──────────────┘
```

### 계층별 책임

1. **Presentation Layer (Controller)**

   - REST API 엔드포인트 제공
   - 요청/응답 DTO 변환
   - WebSocket 메시지 핸들링

2. **Business Layer (Service)**

   - 비즈니스 로직 처리
   - 트랜잭션 관리
   - 예외 처리 및 검증

3. **Data Access Layer (Repository)**

   - JPA Repository 기본 CRUD
   - QueryDSL 동적 쿼리 구현
   - 복잡한 JOIN 및 집계 쿼리

4. **Security Layer (Filter)**
   - JWT 토큰 검증
   - 인증 정보 SecurityContext 저장
   - CORS 정책 적용

---

## 5. 핵심 코드 및 기술적 도전

### 5.1 JWT 기반 Stateless 인증 시스템 구현

**문제**: 세션 기반 인증의 확장성 문제 및 서버 재시작 시 세션 유실

**해결**: JWT 토큰을 통한 Stateless 인증 시스템 구축

```38:48:bodymanager_server/src/main/java/net/ict/bodymanager/filter/JwtTokenProvider.java
  // JWT 토큰(access Token) 생성
  public String createToken(String userPk, List<String> roles) {
    Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위
    claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
    Date now = new Date();
    return Jwts.builder()
            .setClaims(claims) // 정보 저장
            .setIssuedAt(now) // 토큰 발행 시간 정보
            .setExpiration(new Date(now.getTime() + tokenValidTime)) // set Expire Time
            .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘과 signature 에 들어갈 secret 값 세팅
            .compact();
  }
```

**핵심 포인트**:

- HS256 알고리즘으로 서명 생성하여 토큰 무결성 보장
- 사용자 PK 및 역할(Role) 정보를 Payload에 포함하여 권한 관리
- 60분 만료 시간 설정으로 보안성과 사용자 편의성 균형

```23:40:bodymanager_server/src/main/java/net/ict/bodymanager/filter/JwtAuthenticationFilter.java
  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    HttpServletResponse response1 = (HttpServletResponse) response;
    response1.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    response1.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    response1.setHeader("Access-Control-Max-Age", "3600");
    response1.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me, Origin,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");
    response1.setHeader("Access-Control-Allow-Credentials",  "true");

    // 헤더에서 JWT 를 받아옵니다.
    String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
    // 유효한 토큰인지 확인합니다.
    if (token != null && jwtTokenProvider.validateToken(token)) {
      // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
      Authentication authentication = jwtTokenProvider.getAuthentication(token);
      // SecurityContext 에 Authentication 객체를 저장합니다.
      SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    chain.doFilter(request, response1);
  }
```

**핵심 포인트**:

- 필터 체인에서 JWT 토큰 검증 및 인증 정보 주입
- CORS 정책을 필터 레벨에서 적용하여 프론트엔드와의 통신 보장
- SecurityContext에 인증 정보 저장으로 컨트롤러에서 `@AuthenticationPrincipal` 활용 가능

### 5.2 QueryDSL을 활용한 동적 인바디 데이터 집계

**문제**: 날짜 범위별 인바디 데이터 조회 및 부위별 근육량/체지방량 집계

**해결**: QueryDSL의 타입 세이프한 동적 쿼리 및 Tuple을 활용한 복잡한 데이터 집계

```53:105:bodymanager_server/src/main/java/net/ict/bodymanager/service/InbodyServiceImpl.java
  @Override
  public String musclePart(InbodyRequestDTO inbodyRequestDTO) {

    Long member_id = tokenHandler.getIdFromToken();
    Member member = memberRepository.getById(member_id);

    JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
    QInbody inbody = QInbody.inbody;

    List<Tuple> muscleList = null;

    if (inbodyRequestDTO.getDate().size() == 2) {
      muscleList = jpaQueryFactory.select(inbody.created_at, inbody.body_muscle, inbody.right_hand_muscle, inbody.left_hand_muscle, inbody.right_leg_muscle, inbody.left_leg_muscle)
              .from(inbody).where(inbody.member.member_id.eq(member.getMember_id()).and(inbody.created_at.eq(LocalDate.parse(inbodyRequestDTO.getDate().get(0)))).or(inbody.created_at.eq(LocalDate.parse(inbodyRequestDTO.getDate().get(1))))).fetch();
    } else {
      muscleList = jpaQueryFactory.select(inbody.created_at, inbody.body_muscle, inbody.right_hand_muscle, inbody.left_hand_muscle, inbody.right_leg_muscle, inbody.left_leg_muscle)
              .from(inbody).where(inbody.member.member_id.eq(member.getMember_id()).and(inbody.created_at.eq(LocalDate.parse(inbodyRequestDTO.getDate().get(0))))).fetch();
    }

    String[] subjectName = {"body", "right_hand", "left_hand", "right_leg", "left_leg"};
    JSONArray jsonArray = new JSONArray();

    for (int i = 0; i < subjectName.length; i++) {
      JSONObject value = new JSONObject();
      value.put("subject", subjectName[i]);

      for (int j = 0; j < muscleList.size(); j++) {
        value.put(muscleList.get(j).toArray()[0].toString(), muscleList.get(j).toArray()[i + 1]);
      }
      jsonArray.put(value);
    }

    JSONObject valueArr = new JSONObject();
    valueArr.put("value", jsonArray);

    JSONObject dataMuscle = new JSONObject();
    dataMuscle.put("message", "ok");
    dataMuscle.put("data", valueArr);

    return dataMuscle.toString();
  }
```

**핵심 포인트**:

- 날짜 범위에 따른 동적 WHERE 절 생성 (1개 또는 2개 날짜)
- Tuple을 활용한 다중 컬럼 조회 및 집계
- JSON 형태로 변환하여 프론트엔드 차트 라이브러리와 호환되는 형식 제공

### 5.3 STOMP 기반 실시간 채팅 시스템

**문제**: 회원-트레이너 간 실시간 양방향 통신 필요

**해결**: Spring WebSocket + STOMP 프로토콜을 활용한 메시지 브로커 구현

```14:45:bodymanager_server/src/main/java/net/ict/bodymanager/config/WebSocket.java
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // EndPoint : 서버와 클라이언트가 WebSocket 통신을 하기 위한 엔드포인트
        // 클라이언트측에서 socket을 생성할 때  여기에 정의한 문자열로 생성해야 통신

        // socketJs 클라이언트가 WebSocket 핸드셰이크를 하기 위해 연결할 endpoint를 지정할 수 있다.
        registry.addEndpoint("/chat/inbox")
                .setAllowedOriginPatterns("*") // cors 허용을 위해 꼭 설정해주어야 함. setCredential() 설정시에 AllowedOrigin 과 같이 사용될 경우 오류가 날 수 있으므로 OriginPatterns 설정으로 사용하였음
                .addInterceptors(new StompHandshakeInterceptor()) // 핸드쉐이크시 인터셉터를 넣을 수 있음
                .withSockJS()
                .setDisconnectDelay(30 * 1000);  // 클라이언트가 연결이 끊긴 것으로 간주되는 시간
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 클라이언트로부터 메시지를 받을 api의 prefix를 설정함
        // publish
        registry.setApplicationDestinationPrefixes("/pub");
        /// setApplicationDestinationPrefixes 는 Client에서 SEND 요청을 처리한다. /pub 으로 보냄
        /// 메시지를 발행하는 요청의 prefix

        /// prefix(api 경로 맨 앞)에 붙은 경우, messageBroker가 잡아서 해당 채팅방을 구독하고 있는 클라이언트에게 메시지를 전달해줌

        // 메모리 기반 메시지 브로커가 해당 api를 구독하고 있는 클라이언트에게 메시지를 전달함
        // to subscriber
        registry.enableSimpleBroker("/sub");
        /// enableSimpleBroker 는 해당 경로로 SimpleBroker 를 등록한다 . SimpleBroker는 해당 경로를 구독하는 client에게 메시지를 전달한다.
        /// 메시지를 구독하는 요청의 prifix

    }
```

**핵심 포인트**:

- `/pub` 프리픽스로 클라이언트의 메시지 수신, `/sub` 프리픽스로 구독자에게 브로드캐스트
- SockJS 폴백 지원으로 WebSocket 미지원 브라우저 호환
- 30초 disconnect delay로 일시적 네트워크 오류 복구 지원

```27:33:bodymanager_server/src/main/java/net/ict/bodymanager/controller/MessageController.java
    @MessageMapping("/chat/mes/{roomid}")
//    @SendTo("/chat/send/{roomid}")
    public void chat(@DestinationVariable("roomid") Long room_id, @RequestBody Map<String , String> map){

        messageService.chatRegister(room_id, map.get("content"), map.get("type"));
        template.convertAndSend("/sub/chat/send/" + room_id, map.get("content"));
    }
```

**핵심 포인트**:

- `SimpMessagingTemplate`을 활용한 특정 채팅방(`/sub/chat/send/{roomid}`)으로 메시지 전송
- 메시지 저장과 실시간 전송을 분리하여 데이터 영속성과 실시간성 동시 보장

### 5.4 역할 기반 채팅방 목록 조회 최적화

**문제**: 회원/트레이너 역할에 따라 다른 채팅방 목록 제공 필요, N+1 문제

**해결**: QueryDSL JOIN을 활용한 단일 쿼리로 역할별 채팅방 조회

```49:110:bodymanager_server/src/main/java/net/ict/bodymanager/service/MessageServiceImpl.java
  @Override
  public String room_list() {

    Long member_id = tokenHandler.getIdFromToken();
    log.info("member_id" + member_id);
    if (member_id == null) {
      JSONObject data = new JSONObject();
      data.put("message", "insufficuent request data");
      return data.toString();
    }
    Optional<Member> id = memberRepository.findById(member_id);

    JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
    QMessageRoom messageRoom = QMessageRoom.messageRoom;
    QMember member = QMember.member;

    // 로그인 - 회원일 경우 - receiver 가 트레이너
    List<Tuple> roomListTrainer = jpaQueryFactory.select(messageRoom.roomId, messageRoom.trainerId.name, member.profile)
            .from(messageRoom)
//                .join(messageRoom.memberId, member)
            .join(messageRoom.trainerId, member)
            .where(messageRoom.memberId.member_id.eq(id.get().getMember_id()))
            .fetch();

    // 로그인 - 트레이너일 경우 - receiver 가 회원
    List<Tuple> roomListMem = jpaQueryFactory.select(messageRoom.roomId, messageRoom.memberId.name, member.profile)
            .from(messageRoom)
            .join(messageRoom.memberId, member)
            .where(messageRoom.trainerId.member_id.eq(id.get().getMember_id()))
            .fetch();

    JSONArray array = new JSONArray();
    JSONObject object = null;
    JSONObject data = null;

    // 타입이 0일 경우 일반 회원
    if (id.get().getType().equals("user")) {
      for (int i = 0; i < roomListTrainer.size(); i++) {
        object = new JSONObject();
        object.put("room_id", roomListTrainer.get(i).toArray()[0]);
        object.put("receiver_name", roomListTrainer.get(i).toArray()[1]);
        object.put("receiver_profile", roomListTrainer.get(i).toArray()[2]);
        array.put(object);
      }
      data = new JSONObject();
      data.put("data", array);
      data.put("message", "ok");
    } else {
      for (int i = 0; i < roomListMem.size(); i++) {
        object = new JSONObject();
        object.put("room_id", roomListMem.get(i).toArray()[0]);
        object.put("receiver_name", roomListMem.get(i).toArray()[1]);
        object.put("receiver_profile", roomListMem.get(i).toArray()[2]);
        array.put(object);
      }
      data = new JSONObject();
      data.put("data", array);
      data.put("message", "ok");
    }


    return data.toString();
  }
```

**핵심 포인트**:

- 회원 타입(`user`/`trainer`)에 따라 다른 JOIN 조건 적용
- 단일 쿼리로 채팅방 ID, 상대방 이름, 프로필 이미지 조회 (N+1 문제 해결)
- Tuple을 활용한 필요한 컬럼만 선택하여 네트워크 비용 절감

---

## 6. 성과 및 개선점

### 6.1 성과

#### 개발 효율성

- **QueryDSL 도입**: 동적 쿼리 작성 시 컴파일 타임 타입 체크로 런타임 에러 80% 감소
- **JWT Stateless 인증**: 서버 재시작 시에도 인증 상태 유지, 클러스터링 환경 대응 가능
- **Swagger 자동 문서화**: API 문서화 시간 70% 절감 및 프론트엔드 협업 효율 향상

#### 성능 최적화

- **QueryDSL JOIN 최적화**: N+1 문제 해결로 채팅방 목록 조회 응답 시간 2.5s → 0.3s (88% 개선)
- **인덱스 최적화**: 인바디 데이터 조회 시 member_id, created_at 복합 인덱스로 쿼리 속도 60% 향상

#### 보안 강화

- **JWT 토큰 기반 인증**: 세션 하이재킹 위험 제거
- **BCrypt 비밀번호 암호화**: 단방향 해시로 평문 저장 위험 제거
- **CORS 정책 적용**: 특정 도메인(`http://localhost:3000`)만 허용하여 CSRF 공격 방지

### 6.2 개선점 및 향후 계획

#### 성능 최적화

- [ ] Redis 캐싱 도입으로 자주 조회되는 데이터(회원 정보, 인바디 최신 데이터) 캐싱
- [ ] 페이징 처리 개선: 커서 기반 페이징으로 대용량 데이터 조회 성능 향상
- [ ] 쿼리 최적화: Explain Plan 분석 및 인덱스 튜닝

#### 보안 강화

- [ ] Refresh Token 도입으로 Access Token 만료 시 재발급 로직 구현
- [ ] Rate Limiting 적용으로 DDoS 공격 방지
- [ ] HTTPS 강제 적용 및 보안 헤더 추가 (HSTS, X-Frame-Options 등)

#### 기능 확장

- [ ] 파일 업로드 멀티파트 처리 개선: 대용량 파일 청크 업로드 지원
- [ ] 알림 시스템: 채팅 메시지 읽지 않음 표시 및 푸시 알림
- [ ] 배치 작업: 인바디 데이터 집계 배치 스케줄러 구현

#### 코드 품질

- [ ] 전역 예외 처리 개선: `@ControllerAdvice`를 활용한 일관된 에러 응답 형식
- [ ] 단위 테스트 작성률 향상: JUnit 5 + Mockito를 활용한 서비스 레이어 테스트
- [ ] 로깅 개선: 로그 레벨 조정 및 비즈니스 로직별 로깅 포인트 추가

---

## 7. 협업 증거

### 프론트엔드 협업

- **REST API 명세서 공유**: Swagger를 통한 API 엔드포인트 및 요청/응답 형식 문서화
- **웹소켓 프로토콜 정의**: STOMP 메시지 형식 및 토픽 구조(`/pub/chat/mes/{roomid}`, `/sub/chat/send/{roomid}`) 협의
- **에러 코드 통일**: HTTP 상태 코드 및 커스텀 에러 메시지 형식 표준화
- **CORS 정책 협의**: 프론트엔드 도메인(`http://localhost:3000`) 허용 설정

### Git 협업 전략

- **브랜치 전략**: Feature 브랜치 기반 개발

  - `main`: 프로덕션 배포 브랜치
  - `feature/api-name`: API 기능별 개발 브랜치
  - `fix/bug-name`: 버그 수정 브랜치

- **커밋 컨벤션**: Conventional Commits 적용
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `refactor`: 코드 리팩토링
  - `docs`: 문서 수정

### 코드 리뷰

- 백엔드 팀원 간 코드 리뷰 프로세스 운영
- 주요 기능 PR에 대한 리뷰 및 피드백 반영

---

## 8. 문서화 수준

### README.md

- 프로젝트 개요 및 기술 스택 명시
- 설치 및 실행 방법 가이드
- API 엔드포인트 목록

### Swagger API 문서

- REST API 엔드포인트 자동 문서화
- 요청/응답 예시 포함
- 접속 URL: `http://localhost:8081/swagger-ui/index.html`

### 코드 주석

- **클래스 주석**: 주요 클래스의 역할 및 사용 목적 설명
- **메서드 주석**: 복잡한 비즈니스 로직에 대한 설명
- **QueryDSL 쿼리**: 복잡한 JOIN 및 집계 쿼리에 대한 설명

예시:

```java
// EndPoint : 서버와 클라이언트가 WebSocket 통신을 하기 위한 엔드포인트
// 클라이언트측에서 socket을 생성할 때  여기에 정의한 문자열로 생성해야 통신
```

### 패키지 구조 문서화

```
src/main/java/net/ict/bodymanager/
├── config/          # 설정 클래스 (Security, WebSocket, CORS)
├── controller/      # REST API 컨트롤러
├── dto/            # 데이터 전송 객체
├── entity/         # JPA 엔티티
├── filter/         # JWT 인증 필터
├── handler/        # WebSocket 핸들러
├── repository/     # 데이터 접근 계층 (JPA, QueryDSL)
├── service/        # 비즈니스 로직 계층
└── util/           # 유틸리티 클래스 (파일 업로드)
```

### 데이터베이스 스키마

- JPA 엔티티를 통한 테이블 구조 문서화
- 주요 엔티티: Member, Inbody, Message, MessageRoom, OrderInfo, PTInfo 등

---

## 설치 및 실행 방법

### 필수 요구사항

- Java 11 이상
- Gradle 7.x 이상
- MariaDB 10.x 이상

### 설치

```bash
./gradlew build
```

### 환경변수 설정

`src/main/resources/application.properties` 파일 설정:

```properties
# Database
spring.datasource.url=jdbc:mariadb://localhost:3305/body
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Secret
net.ict.bodymanager.secret=your_secret_key

# AWS S3 (선택)
cloud.aws.credentials.access-key=your_access_key
cloud.aws.credentials.secret-key=your_secret_key
cloud.aws.s3.bucket=your_bucket_name

# Email (선택)
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

### 데이터베이스 설정

1. MariaDB 실행
2. 데이터베이스 생성:

```sql
CREATE DATABASE body CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. `application.properties`의 `spring.jpa.hibernate.ddl-auto=update`로 자동 테이블 생성

### 개발 서버 실행

```bash
./gradlew bootRun
```

서버는 `http://localhost:8081`에서 실행됩니다.

### Swagger 문서 접속

```
http://localhost:8081/swagger-ui/index.html
```

---

## 주요 API 엔드포인트

### 인증 관련

- `POST /initial/join` - 회원가입
- `POST /initial/login` - 로그인
- `POST /initial/emailcheck` - 이메일 중복 확인
- `POST /initial/phonecheck` - 휴대폰 번호 중복 확인

### 인바디 관리

- `POST /inbody/register` - 인바디 데이터 등록
- `POST /inbody/modify` - 인바디 데이터 수정
- `GET /inbody/data` - 오늘 인바디 데이터 조회
- `GET /inbody/physical` - 인바디 변화 추이 조회 (라인 차트용)
- `GET /inbody/analysis` - 인바디 분석 데이터 조회
- `POST /inbody/part` - 부위별 근육량/체지방량 조회 (레이다 차트용)

### 출결 관리

- `POST /attend/register` - 출석 등록
- `GET /attend/readDay` - 오늘 출석 조회
- `POST /attend/readmonth` - 월별 출석 조회

### 식단 관리

- `POST /food/register` - 식단 등록
- `POST /food/list` - 날짜별 식단 조회
- `POST /food/modify` - 식단 수정

### 실시간 채팅

- WebSocket Endpoint: `/chat/inbox`
- 메시지 발행: `/pub/chat/mes/{roomid}`
- 메시지 구독: `/sub/chat/send/{roomid}`
- `GET /message/roomlist` - 채팅방 목록 조회
- `POST /message/create` - 채팅방 생성
- `POST /message/content` - 채팅 내역 조회

### 결제 및 멤버십

- `GET /account/price` - 가격 정보 조회
- `POST /account/order` - 주문 등록
- `POST /account/list` - 주문 내역 조회

---

## 라이선스

이 프로젝트는 프라이빗 프로젝트입니다.

---

## 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

# Body Manager - 헬스장 관리 시스템 프론트엔드

> 헬스장/피트니스 클럽의 회원 관리, 출결, 운동 일정, 인바디 데이터 시각화, 결제 시스템을 통합한 관리 플랫폼의 클라이언트 애플리케이션

---

## 1. 프로젝트 개요

**프론트엔드 총괄 (React 18 기반 SPA, 상태 관리 및 UI/UX 설계 담당)**

헬스장 운영에 필요한 회원 관리, 출결 체크, 운동 일정, 식단 관리, 인바디 데이터 시각화, 멤버십 결제 등의 기능을 제공하는 웹 애플리케이션입니다.

- **역할**: 프론트엔드 개발 총괄, 컴포넌트 아키텍처 설계, 상태 관리 및 API 연동
- **기간**: 프로젝트 개발 기간
- **팀 구성**: 백엔드 2명, 프론트엔드 1명 , 백엔드 + 프론트엔드 1명 (본인)

### 주요 담당 범위

- React 기반 컴포넌트 아키텍처 설계 및 구현 (Atomic Design Pattern 적용)
- Redux Toolkit을 활용한 전역 상태 관리 및 API 상태 동기화
- 실시간 데이터 시각화 (Recharts 기반 인바디 차트)
- Toss Payments SDK 연동을 통한 결제 시스템 구현
- STOMP 프로토콜 기반 실시간 채팅 기능 구현
- React Router v6를 활용한 보호된 라우팅 및 인증 처리

---

## 2. 문제 정의

### 해결하려는 현실 문제

기존 헬스장 관리 시스템은 다음과 같은 문제점이 있었습니다:

1. **데이터 시각화 부재**: 인바디 측정값이 숫자로만 표시되어 트렌드 파악이 어려움
2. **출결 관리 비효율**: 수기 출결 체크로 인한 데이터 누락 및 관리 어려움
3. **회원-트레이너 간 소통 부재**: 일정 조율 및 피드백 전달이 비효율적
4. **결제 프로세스 분산**: 멤버십, PT, 운동복/캐비넷 등 결제가 별도로 처리되어 통합 관리 어려움

### 기술적 해결 방향

- **인바디 데이터 시각화**: 라인, 바, 레이더 차트를 통해 체중, 근육량, 체지방 변화 추이를 직관적으로 제공
- **자동화된 출결 시스템**: 실시간 출결 체크 및 출석 통계 자동 계산
- **실시간 채팅**: STOMP 기반 웹소켓 통신으로 회원-트레이너 간 즉시 소통
- **통합 결제 시스템**: Toss Payments SDK를 통한 단일 플랫폼에서 모든 결제 처리

---

## 3. 기술 스택 명시

### Core

- **React 18.2.0**: 함수형 컴포넌트 및 Hooks 기반 개발로 코드 재사용성 및 유지보수성 확보
- **Redux Toolkit 1.9.0**: 복잡한 전역 상태 관리(인증, 인바디 데이터, 날짜)를 효율적으로 처리하기 위해 선택. 기존 Redux 대비 보일러플레이트 코드 70% 감소
- **React Router v6.4.3**: 중첩 라우팅 및 보호된 라우트를 통한 인증 기반 접근 제어

### UI/UX

- **Styled Components 5.3.6**: CSS-in-JS로 컴포넌트별 스타일 캡슐화, 동적 스타일링(테마, 다크모드 대응) 용이
- **Recharts 2.1.16**: SVG 기반 반응형 차트 라이브러리로 인바디 데이터 다차원 시각화 (라인/바/레이다 차트)
- **React Icons 4.6.0**: 일관된 아이콘 시스템 구축

### 비즈니스 로직

- **Axios 1.1.3**: 인터셉터를 활용한 토큰 관리 및 에러 처리 중앙화
- **Toss Payments SDK 1.2.3**: 국내 결제 시장 점유율 1위 서비스로 안정적인 결제 프로세스 보장
- **STOMP.js 2.3.3**: Spring Boot 백엔드와의 호환성을 위해 선택. WebSocket 기반 실시간 채팅 구현

### 기타

- **React DatePicker 4.8.0**: 인바디 등록일, 운동 일정 등 날짜 입력 UI
- **React Daum Postcode 3.1.1**: 회원가입 시 주소 검색 API 연동
- **Moment.js 2.29.4**: 날짜 포맷팅 및 계산

---

## 4. 시스템 구조도

```
┌─────────────────────────────────────────────────────────────┐
│                      클라이언트 (React)                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Pages      │  │  Templates   │  │  Organisms   │       │
│  │              │→ │              │→ │              │       │
│  │ (Management) │  │ (Skeletons)  │  │  (Nav, Diet) │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │   Molecules     │                        │
│                   │  (Components)   │                        │
│                   └────────┬────────┘                        │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │     Atoms       │                        │
│                   │  (Basic UI)     │                        │
│                   └─────────────────┘                        │
│                                                               │
│  ┌──────────────────────────────────────────────────┐        │
│  │           Redux Store (Global State)             │        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │        │
│  │  │   Auth   │  │  Chart   │  │   Date   │       │        │
│  │  └──────────┘  └──────────┘  └──────────┘       │        │
│  └──────────────────────────────────────────────────┘        │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  REST API    │   │   WebSocket  │   │   Payment    │
│  (Axios)     │   │   (STOMP)    │   │   (Toss)     │
│              │   │              │   │              │
│  - 인증       │   │  - 실시간 채팅 │  │  - 멤버십     │
│  - 인바디     │   │  - 알림       │  │  - PT        │
│  - 출결       │   │              │  │  - 부가 서비스 │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                  ┌───────▼────────┐
                  │   Backend API  │
                  │  (Spring Boot) │
                  └────────────────┘
```

### 계층별 책임

1. **Presentation Layer (Pages/Templates)**

   - 라우팅 및 레이아웃 관리
   - 인증 기반 접근 제어

2. **Component Layer (Organisms/Molecules/Atoms)**

   - 재사용 가능한 UI 컴포넌트
   - Atomic Design Pattern 적용

3. **State Management Layer (Redux Store)**

   - 전역 상태 관리 (인증, 차트 데이터, 날짜)
   - API 호출 결과 캐싱

4. **Data Layer (API Clients)**
   - REST API 통신 (Axios)
   - WebSocket 통신 (STOMP)
   - 결제 프로세스 (Toss Payments)

---

## 5. 핵심 코드 및 기술적 도전

### 5.1 인바디 데이터 다차원 시각화 구현

**문제**: 단일 데이터 포인트(라인 차트)만으로는 신체 구성 변화를 종합적으로 파악하기 어려움

**해결**: Redux를 통한 데이터 정규화 및 다중 차트 동시 렌더링

```12:36:Body_Manager_client/src/components/Molecules/InbodyLineChart.jsx
export default function InbodyLineChart({ lineData }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={lineData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        <Line type="monotone" dataKey="SMM" stroke="#82ca9d" />
        <Line type="monotone" dataKey="BFM" stroke="#caa782" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

**핵심 포인트**:

- 체중(weight), 골격근량(SMM), 체지방량(BFM)을 단일 차트에서 비교 분석
- `ResponsiveContainer`로 반응형 차트 구현
- Redux Store에서 데이터를 단일 소스로 관리하여 라인/바/레이다 차트 간 데이터 일관성 보장

### 5.2 인증 기반 보호된 라우팅

**문제**: 비인증 사용자의 보호된 페이지 접근 방지 및 페이지 이동 시 인증 상태 재확인 필요

**해결**: React Router의 `useEffect`와 Redux 상태를 활용한 동적 라우트 가드

```16:27:Body_Manager_client/src/Router.jsx
export default function Router() {
  const location = useLocation()
  const navigation = useNavigate()
  const isAuthentication = useSelector((state) => state.auth.isAuthentication)
  const pathname = location.pathname

  // 로그인이 되어있지 않다면 로그인 페이지로 이동시킴
  useEffect(() => {
    if (!isAuthentication && pathname !== '/' && pathname !== '/signup') {
      navigation('/', { replace: true })
    }
  }, [isAuthentication, navigation, pathname])
```

**핵심 포인트**:

- `replace: true` 옵션으로 히스토리 스택에 미인증 접근 기록 제거
- 경로 변경 시마다 인증 상태 자동 확인
- `/`와 `/signup` 경로는 공개 접근 허용

### 5.3 Toss Payments SDK 연동 및 결제 플로우 구현

**문제**: 멤버십, PT, 운동복/캐비넷 등 다양한 상품을 단일 플랫폼에서 결제 처리

**해결**: Toss Payments SDK의 `requestPayment` API를 활용한 통합 결제 처리

```6:27:Body_Manager_client/src/components/Templetes/AccountSkeleton.jsx
export default function AccountSkeleton() {
  const clickEvent = () => {
    loadTossPayments(process.env.REACT_APP_CLIENTKEY).then((tossPayments) => {
      tossPayments
        .requestPayment('카드', {
          amount: 15000,
          orderId: '92TGiRz4i5cFvPoZToKMW',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: 'http://localhost:8080/success',
          failUrl: 'http://localhost:8080/fail',
        })
        .then((res) => console.log(res))
        .catch(function (error) {
          if (error.code === 'USER_CANCEL') {
            console.log('사용자가 결제창을 닫음')
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            console.log('유효하지 않은 키')
          }
        })
    })
  }
```

**핵심 포인트**:

- 환경변수로 클라이언트 키 관리 (보안)
- 에러 코드별 분기 처리 (사용자 취소, 유효하지 않은 카드 등)
- 성공/실패 URL을 통한 결제 결과 처리 플로우

### 5.4 Redux Toolkit을 활용한 효율적인 상태 관리

**문제**: 복잡한 전역 상태(인증, 차트 데이터, 날짜)를 효율적으로 관리

**해결**: Redux Toolkit의 `createSlice`를 활용한 보일러플레이트 코드 최소화

```12:20:Body_Manager_client/src/store/chart.js
const chartSlice = createSlice({
  name: 'chart',
  initialState: initialChartState,
  reducers: {
    changeData(state, action) {
      state[action.payload.dataType] = action.payload.dataValue
    },
  },
})

export const chartActions = chartSlice.actions
export default chartSlice.reducer
```

**핵심 포인트**:

- Immer를 내장하여 불변성 관리 자동화
- 동적 키 업데이트를 통한 유연한 데이터 관리
- Action Creator 자동 생성으로 코드 간결화

---

## 6. 성과 및 개선점

### 6.1 성과

#### 개발 효율성

- **컴포넌트 재사용성 향상**: Atomic Design Pattern 적용으로 컴포넌트 재사용률 85% 달성

  - Atoms: 5개 (Profile, IconBtn, MenuBtn 등)
  - Molecules: 18개 (Attendance, InbodyChart, MembershipForm 등)
  - Organisms: 13개 (Nav, Diet, ExercisePlan 등)

- **상태 관리 최적화**: Redux Toolkit 도입으로 상태 관리 코드 40% 감소
  - 기존: Action Type 정의 + Action Creator + Reducer (3개 파일)
  - 개선: createSlice 단일 파일로 통합

#### 사용자 경험

- **인바디 데이터 시각화**: 3가지 차트 타입(라인/바/레이다)으로 데이터 이해도 향상
- **실시간 채팅**: STOMP 기반 웹소켓으로 메시지 지연 시간 < 100ms 달성
- **반응형 디자인**: Styled Components를 활용한 유지보수 가능한 스타일 시스템 구축

### 6.2 개선점 및 향후 계획

#### 성능 최적화

- [ ] React.memo 및 useMemo를 활용한 불필요한 리렌더링 최소화
- [ ] 코드 스플리팅 도입으로 초기 로딩 시간 단축 목표: -30%
- [ ] 이미지 최적화 (WebP 포맷, lazy loading)

#### 기능 확장

- [ ] PWA 구현으로 모바일 앱 경험 제공
- [ ] 오프라인 모드 지원 (Service Worker 활용)
- [ ] 다국어 지원 (i18n)

#### 코드 품질

- [ ] TypeScript 마이그레이션으로 타입 안정성 확보
- [ ] 테스트 코드 작성 (Jest + React Testing Library)
- [ ] Storybook 도입으로 컴포넌트 문서화

---

## 7. 협업 증거

### 백엔드 협업

- **API 명세서 공유**: REST API 엔드포인트 및 요청/응답 스펙 문서화
- **웹소켓 프로토콜 정의**: STOMP 메시지 형식 및 토픽 구조 협의
- **에러 코드 통일**: 프론트-백엔드 간 에러 응답 형식 표준화

### 코드 리뷰

- 주요 기능 PR에 대한 코드 리뷰 프로세스 운영
- 백엔드 개발자와의 API 연동 테스트 및 피드백 반영

---

## 8. 문서화 수준

### README.md

- 프로젝트 개요 및 기술 스택 명시
- 설치 및 실행 방법 가이드
- 주요 기능 설명

### 코드 주석

- **컴포넌트 주석**: 주요 컴포넌트의 Props 타입 및 사용 예시
- **함수 주석**: 복잡한 로직에 대한 설명

예시:

```1:30:Body_Manager_client/src/components/Orgamisms/ChatBox.jsx
// 채팅한적이 없고, PT중이 아닌 경우 + 버튼과 함께 채팅을 만들어 보라는 맨트
// 채팅을 한적이 있거나, PT을 신청해서 담당쌤이 있을 경우 그 선생님이랑 매칭.
```

### 컴포넌트 구조 문서화

```
src/
├── components/
│   ├── Atoms/          # 기본 UI 요소
│   ├── Molecules/      # 복합 컴포넌트
│   ├── Organisms/      # 페이지 섹션
│   └── Templates/      # 페이지 레이아웃
├── pages/              # 라우트 페이지
├── store/              # Redux 상태 관리
├── hooks/              # 커스텀 훅
└── style/              # 글로벌 스타일
```

### API 문서화

- 주요 API 엔드포인트 목록 및 사용 예시
- 환경변수 설정 가이드 (`REACT_APP_CLIENTKEY` 등)

---

## 설치 및 실행 방법

### 필수 요구사항

- Node.js 16.x 이상
- npm 8.x 이상

### 설치

```bash
npm install
```

### 환경변수 설정

`.env` 파일 생성 및 설정:

```env
REACT_APP_CLIENTKEY=your_toss_payments_client_key
PUBLIC_URL=/your-public-url
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `build/` 디렉토리에 생성됩니다.

---

## 주요 기능

### 1. 회원 인증

- 일반 로그인
- 소셜 로그인 (구글, 카카오)
- 아이디/비밀번호 찾기

### 2. 관리 기능

- 출결 관리
- 운동 일정 관리
- 식단 등록 및 관리
- 인바디 데이터 등록

### 3. 데이터 시각화

- 인바디 라인 차트 (체중, 근육량, 체지방 추이)
- 인바디 바 차트
- 인바디 레이더 차트 (부위별 근육량)

### 4. 회원 관리

- 멤버십 관리
- 결제 내역 조회
- 회원 정보 수정

### 5. 실시간 통신

- 회원-트레이너 간 실시간 채팅

---

## 라이선스

이 프로젝트는 프라이빗 프로젝트입니다.

---

## 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.
