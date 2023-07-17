import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./main.css";
/**
 *웹 페이지를 소개하는 메인 컴포넌트 입니다.
 */
function Main() {
  // let observer = new IntersectionObserver((e) => {
  //   e.forEach((box) => {
  //     if (box.isIntersecting) {
  //       box.target.opacity = 1;
  //     } else {
  //       box.target.style.opacity = 1;
  //     }
  //   });
  // });
  // let findDiv = document.querySelectorAll("div");
  // observer.observe(findDiv[0]);

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
    <h1>하이하이</h1>
    // <Container className="body">
    //   <div
    //     className="bg-bg1"
    //     style={{ backgroundPositionY: position / 2 }}
    //   ></div>
    //   <div className="bg bg2" style={{ backgroundPositionY: position / -3 }}>
    //     {/* 이거 왜안되는거지? */}
    //     {/* <img src={process.env.PUBLIC_URL + "/img/forest2.jpg"} width="300px" /> */}
    //   </div>
    //   <div
    //     className="tree"
    //     style={{
    //       transform: `translateX(${position}px)`,
    //     }}
    //   >
    //     <p>취업의 숲에 오신것을 환영합니다</p>
    //   </div>
    //   <div
    //     className="tree2"
    //     style={{
    //       transform: `translateX(${-position}px)`,
    //     }}
    //   >
    //     <p>함께 이뤄요</p>
    //   </div>
    //   <div
    //     className="intro"
    //     style={{
    //       opacity: (position - 830) / 50,
    //     }}
    //   >
    //     <h1>취업의 숲</h1>
    //   </div>
    // </Container>
  );
}

export default Main;
