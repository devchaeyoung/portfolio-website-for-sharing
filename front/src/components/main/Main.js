import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import "./main.style.css";
/**
 *웹 페이지를 소개하는 메인 컴포넌트 입니다.
 */
function Main() {
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div className="body">
      <img
        src={process.env.PUBLIC_URL + "/img/mainphoto.webp"}
        width="30%"
        alt="image"
        className="main-photo"
      />
      <h1 className="main-title">취업의 숲에 오신것을 환영합니다.</h1>
      <img
        src={process.env.PUBLIC_URL + "/img/tree2.png"}
        width="30%"
        alt="image"
        className="tree-left"
      />
      <p className="intro1">사람들과 함께 취업의 숲에서 정보를 나눠보세요</p>
      <img
        src={process.env.PUBLIC_URL + "/img/tree1.png"}
        width="30%"
        alt="image"
        className="tree-right"
      />
      <img
        src={process.env.PUBLIC_URL + "/img/logo.png"}
        width="30%"
        alt="image"
        className="logo"
      />
    </div>
  );
}

export default Main;
