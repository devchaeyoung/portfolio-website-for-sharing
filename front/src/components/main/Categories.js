//메인화면(갈림길 컨포넌트입니다.)
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

//클릭 시 직종별 포트폴리오를 볼 수 있는 컴포넌트입니다.
const Categories = () => {
  return (
    <div>
      <p>갈림길에서 떠다니는 박스 클릭했을 때 이동하는 컨테이너입니다.</p>
    </div>
  );
};
export default Categories;
