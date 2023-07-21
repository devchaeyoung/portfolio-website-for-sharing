import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

import NetworkNavigationBar from "../nav/NetworkNavigationBar";
import UserListBox from "../user/UserListBox";
import Footer from "../main/Footer";

import "./style/network.style.css";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

const DEV_MAJOR = [
  { id: "front", title: "프론트" },
  { id: "backend", title: "백" },
  { id: "devOps", title: "데브옵스" },
  { id: "data", title: "데이터 분석" },
  { id: "ai", title: "인공지능" },
  { id: "app", title: "앱" },
];

function Network() {
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //   만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user && !sessionStorage.getItem("userToken")) {
      navigate("/login");
      return;
    }
    isFetchCompleted && setIsFetchCompleted(false);
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
    setIsFetchCompleted(true);
  }, [userState, navigate]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div>
      <NetworkNavigationBar devMajor={DEV_MAJOR} />
      <main className="user-network-container">
        {DEV_MAJOR.map((item) => (
          <div key={item}>
            <h2 className="network-title" id={item.id}>
              {item?.title}
            </h2>
            <UserListBox users={users} stack={item.id} />
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Network;
