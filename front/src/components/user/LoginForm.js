import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button, Image } from "react-bootstrap";
import ResetPasswordModal from "./ResetPasswordModal";
import RegisterModal from "./RegisterModal";
import * as Api from "../../api";
import { DispatchContext } from "../../App";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

function LoginForm() {
  const [resetPasswordModalOn, setResetPasswordMadalOn] = useState(false);
  const [registerdModalOn, setRegisterMadalOn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    isFetchCompleted && setIsFetchCompleted(false);
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      console.log(res);

      // JWT 토큰은 유저 정보의 token임.
      const { token } = res.data;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", token);
      //header 프로필 오류 해결!
      const fetchUser = await Api.get("user/current");
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: fetchUser.data,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      window.alert("로그인 실패!!");
    }
    setIsFetchCompleted(true);
  };

  return (
    <Container>
      <ResetPasswordModal
        show={resetPasswordModalOn}
        onHide={() => setResetPasswordMadalOn(false)}
      />
      <RegisterModal
        show={registerdModalOn}
        onHide={() => setRegisterMadalOn(false)}
      />
      <Row className="justify-content-md-center mt-5">
        <Col lg={6}>
          <center>
            <Image
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              // alt="image"
              width="40%"
            />
          </center>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              {/* <Col sm={{ span: 20 }}> */}
              <Button
                variant="success"
                type="submit"
                size="lg"
                disabled={!isFormValid}
              >
                로그인
              </Button>
              {/* </Col> */}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Row>
                <center>
                  {/* <Button variant="outline-success" onClick={() => navigate("/register")}>  */}
                  <Button
                    variant="outline-success"
                    onClick={() => setRegisterMadalOn(true)}
                  >
                    회원가입하기
                  </Button>
                  {"  "}
                  <Button
                    variant="outline-success"
                    onClick={() => setResetPasswordMadalOn(true)}
                  >
                    비밀번호찾기
                  </Button>
                </center>
              </Row>
              {/* <Col sm={{ span:}}>
                <Button variant="light" onClick={() => navigate("/")}>
                  비밀번호찾기
                </Button>
              </Col> */}
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
