import React from "react";
import "./LoadingBar.style.css";

const LoadingBar = ({ isFetchCompleted }) => {
  console.log("로딩바!");
  console.log(isFetchCompleted, "페치 컴플릿 상태");
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 10000,
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        opacity: "75%",
        lineHeight: "100vh",
        textAlign: "center",
        fontSize: 100,
        display: isFetchCompleted ? "none" : " ",
      }}
    >
      LOADING...
      {/* <h1
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 100,
          lineHeight: "100vh",
          textAlign: "center",
          transition: "heigth 0.5s ease-in-out ",
        }}
      >
        LOADING...
      </h1> */}
    </div>
  );
};

export default LoadingBar;
