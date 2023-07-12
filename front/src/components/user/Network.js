import React, { useEffect, useContext, useState } from "react";
import { Link, Switch, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

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
  );
}

export default Network;
