import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Navigate from "../components/nav/Navigate";
import Footer from "../components/main/Footer";
import "./style/pageNetwork.css";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

const PageNetwork = () => {
  return (
    <div>
      <header>
        <Navigate />
      </header>
      <main>
        <div className="userList">
          <h2>유저리스트 목록입니다 페이지입니다.</h2>
          <div className="userCard"></div>
          <div className="userCard"></div>
          <div className="userCard"></div>
        </div>
        <div className="userList">
          <h2></h2>
        </div>
        <div className="userList">
          <h2></h2>
        </div>
        <div className="userList">
          <h2></h2>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageNetwork;
