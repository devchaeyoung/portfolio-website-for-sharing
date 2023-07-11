import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Navigate from "../components/nav/Navigate";
import Footer from "../components/main/Footer";

const PageNetwork = () => {
  return (
    <div>
      <header>
        <Navigate />
      </header>
      <main>
        <h2>네트워크 페이지입니다.</h2>
      </main>
      <Footer />
    </div>
  );
};
export default PageNetwork;
