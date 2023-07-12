import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Navigate from "../components/nav/Navigate";
import Footer from "../components/main/Footer";

const PageUserPortfolio = () => {
  return (
    <div>
      <header>
        <Navigate />
      </header>
      <main>
        <h2>개인 포트폴리오 수정 및 작성, 조회 페이지입니다.</h2>
      </main>
      <Footer />
    </div>
  );
};
export default PageUserPortfolio;
