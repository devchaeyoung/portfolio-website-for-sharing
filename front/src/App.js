import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { userReducer } from "./reducer";

import Header from "./components/header/Header";
import ScrollToTopButton from "../src/components/tool/ScrollToTopButton";
import Main from "./components/main/Main";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";
import Network from "./components/user/Network";
import Portfolio from "./components/Portfolio";
import UserAward from "./components/user-award/UserAward";
import LoadingBar from "./components/LoadingBar";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const LoadingStateContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(userReducer, {
    user: null,
  });
  //const [loadingState, loadingDispatch] = useReducer(loadingReducer, null);

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      setIsFetchCompleted(false);
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("user/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    //fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return <LoadingBar />;
  }

  return (
    <LoadingStateContext.Provider value={setIsFetchCompleted}>
      <DispatchContext.Provider value={dispatch}>
        <UserStateContext.Provider value={userState}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" exact element={<Main />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/user/:id" element={<Portfolio />} />
              <Route path="/network" element={<Network />} />
              <Route path="/award" element={<UserAward />} />
              <Route path="*" element={<Portfolio />} />
            </Routes>
            <ScrollToTopButton />
          </Router>
        </UserStateContext.Provider>
      </DispatchContext.Provider>
    </LoadingStateContext.Provider>
  );
}

export default App;
