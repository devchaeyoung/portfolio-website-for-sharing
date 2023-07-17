import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Image, Nav } from "react-bootstrap";

import { UserStateContext, DispatchContext } from "../../App";
import "./header.style.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <header className="header">
      <Nav activeKey={location.pathname}>
        <Nav.Item className="me-auto ">
          <Nav.Link onClick={() => navigate("/")} className="header-link">
            <Image
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              className="header-logo"
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {userState.user ? (
            <Nav.Link onClick={() => navigate(`user/${userState.user._id}`)}>
              내 포트폴리오
            </Nav.Link>
          ) : (
            <Nav.Link onClick={() => navigate(`/login`)}>
              로그인을 해주세요
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/network")}>모두의 숲</Nav.Link>
        </Nav.Item>
        {isLogin && (
          <Nav.Item>
            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </header>
  );
}

export default Header;
