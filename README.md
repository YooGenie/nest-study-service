# nest-study-service

두 번째 회사에서 사용하던 **NestJS 헥사고날 아키텍처(Ports & Adapters)** 구조를 처음 접하고, 이를 익히기 위해 직접 구성해 본 학습 프로젝트입니다.
그동안 Go로 백엔드를 개발해 왔기 때문에, 새로 배운 NestJS·TypeScript 환경에서 **회원(Account) API 서버의 뼈대**와 실무 공통 설정을 하나씩 만들어 보며 공부했습니다.

> 📚 공부한 범위와 아직 다루지 않은 부분은 아래 [공부한 범위](#공부한-범위)에 정리했습니다.

<br>

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 언어·프레임워크 | TypeScript 5.8, NestJS 11 (Express) |
| DB·ORM | PostgreSQL, TypeORM, typeorm-transactional, SnakeNamingStrategy |
| API 문서 | Nestia(`@TypedRoute`, Swagger 자동 생성), @nestjs/swagger |
| 검증 | class-validator, class-transformer, typia |
| 로깅·모니터링 | Winston(nest-winston), Sentry, @nestjs/terminus(헬스 체크) |
| 보안 | Helmet, CORS 설정, JWT 인증 가드 |
| 테스트 | Jest, Supertest |
| 코드 품질 | ESLint, Prettier, Husky, lint-staged, commitlint |
| 빌드 | SWC, pnpm |

<br>

## 아키텍처

바깥(컨트롤러, DB)과 안쪽(비즈니스 로직)을 **포트(인터페이스)**로 분리했습니다.
서비스는 저장소 구현체가 아니라 `MemberServiceOutPort`에만 의존하기 때문에, DB를 바꾸거나 테스트용 가짜 저장소로 교체하기 쉽습니다.

```
요청 → [Inbound Adapter]  MemberController
           ↓ (MemberServiceInPort)
       [Port / Service]   MemberService
           ↓ (MemberServiceOutPort)
       [Outbound Adapter] MemberRepository → PostgreSQL
```

```
src
├── adapter
│   ├── inbound          # 컨트롤러, 요청·응답 DTO, 페이지네이션
│   └── outbound         # 저장소 구현체 (TypeORM)
├── port
│   ├── inbound          # 서비스가 제공하는 기능 (InPort)
│   ├── outbound         # 서비스가 필요로 하는 저장소 기능 (OutPort)
│   ├── service          # 비즈니스 로직
│   └── audit            # 회원 변경 이력 기록 (TypeORM Subscriber)
├── domain               # 엔티티, enum, 공통 컬럼
├── config               # 환경 설정, Swagger, TypeORM 설정
├── exception            # 공통 에러 코드와 커스텀 예외
├── log                  # Winston 로깅, 요청 로그 미들웨어, 예외 필터
├── security             # JWT 인증 가드
├── validate             # 전역 Validation Pipe
└── module               # 모듈 조립 (InPort/OutPort ↔ 구현체 연결)
```

<br>

## 주요 구현 내용

- **포트·어댑터 분리**: 모듈에서 `{ provide: MemberServiceInPort, useClass: MemberService }`처럼 추상 클래스와 구현체를 연결
- **회원 변경 이력(Audit)**: TypeORM `EntitySubscriber`로 회원이 생성·수정될 때 `member_audit` 테이블에 자동 기록
- **요청 컨텍스트**: `cls-hooked`로 요청 정보를 저장해 어디서든 현재 요청에 접근
- **공통 에러 처리**: HTTP 상태별 `ErrorCode`와 `CustomException`으로 에러 응답 형식 통일
- **페이지네이션·정렬**: 목록 조회용 공통 DTO와 응답 형식
- **Nestia 적용**: `@TypedRoute`로 컨트롤러 타입에서 Swagger 문서(`swagger.json`) 자동 생성
- **환경별 로깅**: 개발 환경은 색상 로그, 운영 환경은 JSON 로그
- **운영 대비 설정**: Helmet 보안 헤더, CORS, 요청 크기 제한, Sentry(로컬 제외), 헬스 체크 API
- **커밋 규칙 자동화**: Husky로 커밋 전 lint 검사, 커밋 메시지에 브랜치 이름 자동 추가, 푸시 전 빌드 확인

<br>

## API

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/account/member` | 회원 목록 조회 (검색 조건, 페이지네이션) |
| GET | `/account/member/:id` | 회원 단건 조회 |
| GET | `/account/health` | 헬스 체크 (DB 연결 확인) |

- Swagger 문서: `/account/swagger`, `/docs`

<br>

## 실행 방법

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행 (.env.development 사용)
pnpm run start:dev

# Swagger 문서 생성
pnpm run nestia:swagger

# 테스트
pnpm run test
pnpm run test:e2e
```

<br>

## 공부한 범위

- [x] 헥사고날 구조와 모듈 구성
- [x] 공통 설정 (로깅, 에러 코드, Validation, Helmet, CORS, Sentry)
- [x] 회원 조회 API 뼈대와 Nestia 적용
- [x] 회원 변경 이력 Subscriber
- [ ] TypeORM·PostgreSQL 연결 (설정은 작성, 현재 주석 처리)
- [ ] 회원 등록·수정 API
- [ ] JWT 로그인·토큰 발급
- [ ] 단위 테스트, e2e 테스트 보강

<br>

## 블로그

공부한 내용은 블로그에 정리하고 있습니다. 👉 https://pink1016.tistory.com/
