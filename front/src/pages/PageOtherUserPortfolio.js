import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Navigate from "../components/nav/Navigate";
import Footer from "../components/main/Footer";

const PageOtherUserPortfolio = () => {
  return (
    <div>
      <header>
        <Navigate />
      </header>
      <main>
        <h2>다른 사용자 포트폴리오 조회 레이아웃입니다.</h2>
      </main>
      <Footer />
    </div>
  );
};

export default PageOtherUserPortfolio;
