import React, { useEffect, useContext, useState } from "react";
<<<<<<< HEAD
import { Link, Switch, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

//과제제출
import Categories from "../main/Categories";
import NetworkNavigate from "../nav/NetworkNavigate";
import UserListBox from "../user/UserListBox";
import ScrollToTop from "../tool/ScrollToTop";
import Footer from "../main/Footer";

import * as Api from "../../api";
import UserNetworkCard from "./UserNetworkCard";
import { UserStateContext } from "../../App";

function Network() {
  return (
    <div>
      <header>
        <Link to="/Categories">갈림길 돌아가기(로고)</Link>
        <NetworkNavigate />
      </header>
      <main>
        <div className="userList">
          <UserListBox />
          <h2>다른 사용자 포트폴리오 조회 레이아웃입니다.</h2>
          <ScrollToTop />
        </div>
      </main>
      <Footer />
    </div>
=======
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <Row xs="auto" className="jusify-content-center">
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
>>>>>>> 80c782457e708bedd27d2bbb1e5d4110232ae594
  );
}

export default Network;
