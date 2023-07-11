import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

// 혜빈님 브랜치 작성예정
// const UserEducationEdit = (e) => {
//   e.preventDefault();

//   // inputValue 넣어야하는데 어떻게 넣어야할 지 모르겠어요

//   const [educationalInstitute, setEducationalInstitute] =
//     useState("교육기관명을 입력해주세요"); // 교육기관명 입력란
//   const [major, setMajor] = useState(""); // 전공 또는 분야 ->
//   const [completedPeriod, setCompletedPeriod] = useState(null); // 수료기간 -> 아코디언식으로 변경예정
//   const [completedDate, setCompletedDate] = useState(null); // 수료날짜 -> 달력에서 선택하게 변경예정

//   const handleSave = (e) => {
//     //저장 눌렀을때 추가되는 함수
//   };
//   return (
//     <Container>
//       <Row>
//         <label>교육기관명:</label>
//         <input
//           type="text"
//           value={educationalInstitute}
//           onChange={(e) => setEducationalInstitute(e.target.value)}
//           placeholder="기본값"
//         />
//       </Row>
//       <Row>
//         <label>수료기간:</label>
//         <input
//           type="text"
//           value={completedPeriod}
//           onChange={(e) => setCompletedPeriod(e.target.value)}
//           placeholder="기본값"
//         />
//       </Row>
//       <Row>
//         <label>수료날짜:</label>
//         <input
//           type="text"
//           value={completedDate}
//           onChange={(e) => setCompletedDate(e.target.value)}
//           placeholder="기본값"
//         />
//       </Row>
//       <Row>
//         <label>전공 또는 분야:</label>
//         <input
//           type="text"
//           value={major}
//           onChange={(e) => setMajor(e.target.value)}
//           placeholder="기본값"
//         />
//       </Row>
//       <button onClick={handleSave}>저장</button>
//     </Container>
//   );
// };

export default UserEducationEdit;
