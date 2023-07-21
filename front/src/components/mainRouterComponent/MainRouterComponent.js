import { useState, useEffect, createContext, useContext } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import LoadingBar from "../loadingbar/LoadingBar";
import ScrollToTopButton from "../tool/ScrollToTopButton";
import Main from "../main/Main";
import LoginForm from "../user/LoginForm";
import Portfolio from "../Portfolio";
import Network from "../user/Network";

import { DispatchContext } from "../../App";

import * as Api from "../../api";

export const LoadingStateContext = createContext(null);

export default function MainRouterComponent() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(null);

  const fetchState = { isFetchCompleted, setIsFetchCompleted };

  const fetchCurrentUser = async () => {
    try {
      // if (sessionStorage.getItem("userToken")) {
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
      //}
    } catch {
      navigate("/login");
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    //fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <LoadingStateContext.Provider value={fetchState}>
      <LoadingBar isFetchCompleted={isFetchCompleted} />
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/user/:id" element={<Portfolio />} />
        <Route path="/network" element={<Network />} />
        <Route path="*" element={<Portfolio />} />
        {/* <Route path="welcome" element={<WelcomeForest />} /> */}
      </Routes>
      <ScrollToTopButton />
    </LoadingStateContext.Provider>
  );
}
