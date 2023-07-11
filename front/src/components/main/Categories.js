//메인화면(갈림길 컨포넌트입니다.)
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

//클릭 시 직종별 포트폴리오를 볼 수 있는 컴포넌트입니다.
const Categories = async (e) => {
  e.preventDefault();

  try {
    await Api.post("네트워크 엔드포인트 넣을 예정", {});
  } catch (err) {
    console.log(err);
  }
};

export default Categories;
