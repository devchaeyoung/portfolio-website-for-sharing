import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserNetworkCard from "./UserNetworkCard";
import { UserStateContext } from "../../App";

function UserListBox() {
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
    <>
      <div class="container">
        <Container fluid class="jusify-content-center ">
          <p class="fw-bolder" id="front">
            프론트
          </p>
          <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <Row xs="auto" className="jusify-content-center">
              {users.map((user) => (
                <UserNetworkCard key={user.id} user={user} isNetwork />
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <div class="container">
        <Container fluid class="jusify-content-center ">
          <p class="fw-bolder" id="back">
            백
          </p>
          <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <Row xs="auto" className="jusify-content-center">
              {users.map((user) => (
                <UserNetworkCard key={user.id} user={user} isNetwork />
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <div class="container">
        <Container fluid class="jusify-content-center ">
          <p class="fw-bolder" id="devops">
            데브옵스
          </p>
          <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <Row xs="auto" className="jusify-content-center">
              {users.map((user) => (
                <UserNetworkCard key={user.id} user={user} isNetwork />
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <div class="container">
        <Container fluid class="jusify-content-center ">
          <p class="fw-bolder" id="data-analysis">
            데이터분석
          </p>
          <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <Row xs="auto" className="jusify-content-center">
              {users.map((user) => (
                <UserNetworkCard key={user.id} user={user} isNetwork />
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <div class="container">
        <Container fluid class="jusify-content-center ">
          <p class="fw-bolder" id="ai">
            AI
          </p>
          <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <Row xs="auto" className="jusify-content-center">
              {users.map((user) => (
                <UserNetworkCard key={user.id} user={user} isNetwork />
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <div class="container">
        <Container fluid class="jusify-content-center ">
          <p class="fw-bolder" id="web">
            웹
          </p>
          <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <Row xs="auto" className="jusify-content-center">
              {users.map((user) => (
                <UserNetworkCard key={user.id} user={user} isNetwork />
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <div class="container">
        <Container fluid class="jusify-content-center ">
          <p class="fw-bolder" id="app">
            앱
          </p>
          <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <Row xs="auto" className="jusify-content-center">
              {users.map((user) => (
                <UserNetworkCard key={user.id} user={user} isNetwork />
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default UserListBox;
