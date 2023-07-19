// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Col, Row, Form, Button } from "react-bootstrap";


// import * as Api from "../../api";
// import { DispatchContext } from "../../App";



// function ResetPasswordForm() {
//     const navigate = useNavigate();

//     const dispatch = useContext(DispatchContext);

//     //useState로 email 상태를 생성함.
//     const [email, setEmail] = useState("");
//     //useState로 password 상태를 생성함.
//     const [name, setName] = useState("");

//     const validateEmail = (email) => email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
    
    
//     //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
//     const isEmailValid = validateEmail(email);

//     const isNameValid = name.length >= 2;

//     // 이메일과 아룸 조건이 동시에 만족되는지 확인함.
//     const isFormValid = isEmailValid && isNameValid;



//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//           // "user/login" 엔드포인트로 post요청함.
//           const res = await Api.post("user/login", {
//             email,
//             name,
//           });
//           // 유저 정보는 response의 data임.
//           const user = res.data;
//           // JWT 토큰은 유저 정보의 token임.
//           const jwtToken = user.token;
//           // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
//           sessionStorage.setItem("userToken", jwtToken);
//           // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
//           dispatch({
//             type: "LOGIN_SUCCESS",
//             payload: user,
//           });
    
//           // 기본 페이지로 이동함.
//           navigate("/", { replace: true });
//         } catch (err) {
//           console.log("등록된 정보가 없습니다.\n", err);
//         }
//       };




// // 
// function ForgotPasswordForm() {
//     const [email, setEmail] = useState('');
  
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       // 서버로 이메일 전송 및 비밀번호 재설정 로직 수행
//       // 이 부분은 서버와의 통신이 필요하므로 자세한 구현은 생략합니다.
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">이메일:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">비밀번호 재설정 링크 보내기</button>
//       </form>
//     );
//   }
// }; 
//   export default ResetPasswordForm;