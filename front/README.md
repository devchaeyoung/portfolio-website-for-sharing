# 포트폴리오 공유 웹 서비스

유저 간의 포트폴리오를 공유하고 볼 수 있는 프로젝트입니다.

- 첫 프로젝트 시기 : 23.06 (1주일)
- 리팩토링 시기 : 25.10.01 시작 ~

<detail>
<summary>리팩토링 여정 포스팅</summary>

- [supabase 리액트 프로젝트에 연동하기 (feat. 목업유저 생성하기)](https://devchaeyoung.tistory.com/entry/supabase-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0-feat-%EB%AA%A9%EC%97%85%EC%9C%A0%EC%A0%80-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)

</detail>

### .env 파일 생성

Supabase에 생성한 프로젝트 id와 anon key를 입력합니다.

```bash
REACT_APP_SUPABASE_KEY="eyJ..."
REACT_APP_SUPABASE_URL="https://<PROJECT_ID>.supabase.co"

# Client에서 사용 X : 목업 유저 생성용 Admin Key
SUPABASE_ROLE_KEY="eyj..."
```

### 프로젝트 의존성 설치

```bash
npm install
```

추후 pnpm을 쓰게 될 수도 있으나 레거시 프로젝트이기 때문에 현재는 npm으로 의존성을 관리하고 있습니다.

### Supabase에 Data Table 초기설정하기

아래 명령어를 순서대로 입력해주세요. ( node.js, npx, npm 모두 설치되어 있다는 것을 전제로 설명합니다. )

```bash
npx supabase init # 해당 명령어는 front/ 디렉토리내에 supabase/ 디렉토리가 없을 경우만 실행합니다
npx supabase login # enter후 리다이렉트된 페이지에 입력된 로그인 인증 코드를 붙여넣어줍니다.
npx supabase link --project-ref <projectId> # 생성해둔 projectId를 입력해주세요

npx supabase migration new init-data
```

생성된 `<타임스템프>_init-data.sql` 파일에 `front/schema.sql` 파일안에 있는 쿼리문을 붙여넣어주세요.

```bash
npx supabase db push
npm run supabase:types # 생성된 데이터 테이블 기반으로 타입을 생성합니다
```

## 목업데이터 추가하기(선택)

리팩토링을 위한 목업 유저 정보를 생성합니다

```bash
npm run mock-data
```

---

---

> 아래는 리팩토링 이전에 작성된 README.md입니다.

## 실행 방법

## 1. react-srcipts start 실행

> yarn은 사실 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략)

> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. 즉, 라이브러리 설치 커맨드입니다.

> yarn 입력 시 자동으로, package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.

```bash
npm install --global yarn
yarn
yarn start
```

## 파일 구조 설명

1. src폴더는 아래와 같이 구성됩니다.

- components 폴더:
  - Header.js: 네비게이션 바
  - Porfolio.js: 메인 화면을 구성하는, 5개 MVP를 모두 포함하는 컴포넌트
    - **현재는 User MVP만 포함**되어 있습니다.
  - award 폴더: 포트폴리오 중 수상이력 관련 컴포넌트들 -> **현재 없습니다.**
  - certificate 폴더: 포트폴리오 중 자격증 관련 컴포넌트들 -> **현재 없습니다.**
  - education 폴더: 포트폴리오 중 학력 관련 컴포넌트들 -> **현재 없습니다.**
  - project 폴더: 포트폴리오 중 프로젝트 관련 컴포넌트들 -> **현재 없습니다.**
  - user 폴더: 포트폴리오 중 사용자 관련 컴포넌트들

- api.js:
  - axios를 사용하는 코드가 있습니다.
  - delete 함수는 코드는 작성되어 있지만, 쓰이지고 있지는 않습니다. -> **사용하는 기능을 추가해 보세요!**
- App.js:
  - SPA 라우팅 코드가 있습니다.
- reducer.js:
  - 로그인, 로그아웃은 useReducer 훅으로 구현되는데, 이 때 사용되는 reducer 함수입니다.

2. 전체적인 로직은 아래와 같습니다. 예를 들어 Award MVP 기준입니다 (**물론 현재는 코드는 없습니다. 여러분들이 개발해야 하기 때문입니다. 우선 로직만 참고해 주세요. 나머지 MVP도 비슷합니다**)

- 포트폴리오 컴포넌트는 Awards 컴포넌트를 사용함.
- Awards는 수상이력 **목록**으로, 여러 개의 Award 컴포넌트+ (추가하기 버튼 클릭 시) AwardAddForm 컴포넌트로 구성됩니다.
- 각 Award 컴포넌트는 **isEditing 상태에 따라**, false면 AwardCard, true면 AwardEditForm이 됩니다.
- **isEditable**(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
- Awards는 **isAdding**이 true면 AwardAddForm, false면 그냥 Award들의 모음이 됩니다.
