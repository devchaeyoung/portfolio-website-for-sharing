# React + Express Project : Portfolio sharing web

react + express 를 이용한 포트폴리오 공유 사이트

> ### ⏱ 개발 기간
>
> • 22.07.10 ~ 22.07.21

> ### 맴버 구성

- 👑이창근, 조대찬, 이혜빈, 진채영, 최은진

> ### 기술 스택

백엔드

- Node.js : 18.16.0
- Framework : express 4.17.1
- Database : MongoDB 4.16.0
- ODM : mongoose 6.2.1
- Validation : joi 17.4.2
- Authentication : passport 0.4.1
- Authorization : jsonwebtoken 8.5.1
- Image Upload : multer 1.4.3
- Logging : winston 3.3.3 / morgan 1.10.0

프론트

- Framework : react :17.0.2
- HTML / CSS
- State Management : redux 4.1.1
- Routing : react-router-dom 5.3.0
- HTTP Client : axios 0.21.4
- Image Upload : react-dropzone 11.4.2

> ### 주요 기능

#### 포트폴리오 CRUD

- 자신의 학력, 수상이력, 자격증, 프로젝트 별 작성 및 관리
- 전체 사용자 조회 및 포트폴리오 조회
- 스택별 포트폴리오 조회
- 포트폴리오 업데이트 및 변경항목만 업데이트
- 포트폴리오 삭제

#### 회원관리

- 회원가입시 메일 중복 검사 및 유효성 검사
- 회원 정보 업데이트 및 삭제

#### 로그인

- passport 를 이용한 회원 인증 및 JWT 토큰 발급
- 발급된 토큰으로 다른 API 사용 시 인가 및 인증
- 비밀번호 초기화 시 가입 이메일로 임시 비밀번호 발급
- 로그아웃 시 토큰 삭제

#### 프로필 UI

- 프로필 작성 완성도에 의한 UI 변경
- 프로필 이미지 업로드

#### API 중복 호출 방지

- DDOS 공격 방지를 위한 API 호출 제한

#### 유효성 검사 및 로깅

- 클라이언트로부터 받는 모든 데이터에 알맞은 유효성 검사 후 로직 수행
- 로깅을 통한 에러 및 요청 정보 확인

- 개발자들의 포트폴리오를 한 곳에서 볼 수 있는 웹사이트 입니다.
- 프로필을 작성할 때는 자신의 학력, 수상이력, 자격증, 프로젝트를 등록할 수 있습니다.
- 개발자들이 직접 작업한 프로젝트를 포트폴리오로 등록하고, 다른 개발자들의 포트폴리오를 볼 수 있습니다.
- 프로젝트를 작성할 때는 프로젝트명, 프로젝트 설명, 프로젝트 기간, 프로젝트 스택을 등록할 수 있습니다.
- 또한 다른 개발자들의 취득한 자격증이나 학력, 수상 내역을 공유할 수 있습니다.

> ### 프로젝트 구조

- Front-end
  ![front logic.png](./logic-image/front_logic.png)
  컴포넌트별 폴더 구조
- components : 컴포넌트별 폴더 구조
- pages : 라우팅을 위한 페이지 컴포넌트
- lib : 공통으로 사용되는 함수
- hooks : 커스텀 훅
- api : axios 를 이용한 HTTP 통신
- styles : 공통으로 사용되는 스타일
- images : 공통으로 사용되는 이미지
- constants : 공통으로 사용되는 상수
- assets : 공통으로 사용되는 파일
- App.js : 라우팅
- index.js : 리액트 앱 렌더링

---

- Back-end
  ![server logic.png](./logic-image/server_logic.png)
  비즈니스 로직을 분리하는 3계층 구조
- Controller : 클라이언트의 요청을 받아 알맞은 서비스로 요청을 전달, 결과를 응답
- Service : 비즈니스 로직을 수행하고, 결과를 컨트롤러에게 전달
- Model : 데이터베이스와의 상호작용을 위한 스키마 및 모델 정의
- Middleware : 클라이언트의 요청을 받아 유효성 검사 및 인증, 인가를 수행하고, 결과를 컨트롤러에게 전달
- authenticate : passport 를 이용한 회원 인증 및 JWT 토큰 발급
- Config : 환경변수 및 로깅 설정

> ### 이번 프로젝트에 대한 회고
>
> 무엇보다 초기 기획은 아무리 많이해도 부족하지 않다는것과 팀원들과의 소통과 배려가 중요하다는 것을 느꼈습니다.
> 탄탄한 기획과 확실한 역할분담이 이루어졌다면 이번 프로젝트를 진행하는데 있어서 좀 더 나은 결과를 얻을 수 있지 않았을까 하는 아쉬움이 있었지만
> , 프로젝트를 진행하며 팀원들과 직접 개발한 웹이 실행되는걸 볼 때 소소한 행복함을 느꼈습니다.
> 팀원들 모두가 처음 해보는 프로젝트임에도 불구하고, 피곤하고 힘들어도 모두가 열정적으로 프로젝트를 진행해주었고 서로의 부족한 부분을 채워주며 프로젝트를 완성해나갔습니다.
> 이번 프로젝트를 진행하면서 힘들기 보단 개발에 대한 흥미를 더욱 가지게 되었으며 다음 프로젝트에서는 더욱 발전된 모습으로 참여하고 싶습니다.

- 프론트

첫 프로젝트를 시작했지만 역할 분담조차 감이 잡히지 않아 어려웠지만 프로젝트 끝무렵인 지금은 처음 기획 했을 때와 달리 구현하지 못한 기능들에 대한 아쉬움도 남고 다음 프로젝트때 어떤 순서로 진행해야할 지 조금은 감을 잡을 수 있었습니다. 진행하면서 파일구조나, 컴포넌트 양식들은 제대로 나누지 못한점, 백엔드에서 어떤 데이터를 받아오는지 조차 감을 잡지 못해 엉뚱한 경로로 데이터를 받아오며 에러의 원인을 찾아 헤매는 시행착오도 겪었습니다. 매일 오피스아워를 통해 실제 현업에서 사용하는 코딩컨벤션이나 폴더구조에 대해 알아가게 되었습니다. 첫주차에 코드리뷰를 받으며 더 효율적이고 간략한 코드를 작성할 수 있는 방법을 알게되었습니다. 다음 프로젝트에서는 무작정 빠르게 시작하는 것이 아니라 하루, 이틀정도의 파일구조나 컴포넌트 구조를 전체적으로 기획하는 시간을 가지는 것이 가장 빠르게 원하는 프로젝트를 달성할 수 있다는 것을 알게되었습니다. 처음 피그마로 화면 기획을 하면서 만들고자했던 좋아요, 팔로잉, 프로필 클릭 시 드롭다운 기능들은 하지 못하였지만 막연히 수업을 들으며 따라갈 때와 달리 이번 프로젝트를 끝나고 다음으로 어떤 기능을 구현할지 각자만의 방향성이 생겼습니다.

- 백엔드

프로젝트를 시작할 때 MVP가 무엇인지도 모르고 REST대한 개념조차 없이 무작정 시작했는데 되돌아보니 정말 많이 무지했던 것 같습니다. 이 번 프로젝트를 하며 가장 크게 느낀 건
무엇보다 서버의 구조를 어떻게 모델링할지와 데이터를 어떻게 가공할지가 가장 중요하다고 느꼈습니다. 그 이유로는 이슈가 생겼을 때 서버의 구조가 명확하지 않고 개발자들간의 컨밴션이 지켜지지 않았을 때, 빠른 대응이 어려웠고
유지, 보수에 어려움을 많이 느꼈습니다. 또 서버의 코드를 깔끔히 유지하고 정돈하는 일도 중요하다고 느꼈습니다. REST가 정확히 어떤 개념인지 몰랐지만 이번 프로젝트로 몸으로 배웠습니다. 진짜. 서버와 클라이언트를 나누고, 시스템을 계층화시켜서 각자 해야할 일을 명확하게 구분하고 표준 프로토콜에 따라서 누구나 쉽게 이해하고 사용할 수 있는 시스템이 중요하다는걸 느꼈습니다.
