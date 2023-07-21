import React, { useState, useEffect } from "react";
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
    <>
      <div>
        <img
          src={process.env.PUBLIC_URL + "/img/tree2.png"}
          alt="image"
          className="tree-left"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/tree1.png"}
          alt="image"
          className="tree-right"
        />
      </div>
      <div className="main-conatainer">
        <div className="main-title">
          <img
            className="main-title-item"
            src={process.env.PUBLIC_URL + "/img/leaves.png"}
            width="10%"
          />
          <h1 className="main-title-item">취업의 숲에 오신것을 환영합니다.</h1>
          <img
            className="main-title-item"
            src={process.env.PUBLIC_URL + "/img/leaves.png"}
            width="10%"
          />
        </div>
        <img
          className="main-title-item"
          src={process.env.PUBLIC_URL + "/img/leaves.png"}
          width="10%"
        />
        <img
          className="main-title-item"
          src={process.env.PUBLIC_URL + "/img/leaves.png"}
          width="10%"
        />
        <h2 className="intro1">
          사람들과 함께 취업의 숲에서 정보를 나눠보세요
        </h2>
        <img
          src={process.env.PUBLIC_URL + "/img/logo.png"}
          alt="image"
          className="logo"
        />
      </div>
    </>
  );
}

export default Main;
