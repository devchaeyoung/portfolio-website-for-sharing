import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
import { LoadingStateContext, UserStateContext } from "../../App";
import UserNetworkCard from "./UserNetworkCard";

import "./style/userListBox.style.css";

function UserListBox({ devMajor }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  useEffect(() => {
    //   만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    isFetchCompleted && setIsFetchCompleted(false);
    try {
      // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
      Api.get("userlist").then((res) => setUsers(res.data));
    } catch (e) {
      console.log(e);
    }
    setIsFetchCompleted(true);
  }, [userState, navigate]);

  return (
    <div className="user-network-list">
      {users.map((user) => (
        <div className="user-network-item-wrapper">
          <UserNetworkCard
            key={user._id}
            user={user}
            isEditable={false}
            isNetwork
            className="card"
          />
        </div>
      ))}
    </div>
  );
}

export default UserListBox;
