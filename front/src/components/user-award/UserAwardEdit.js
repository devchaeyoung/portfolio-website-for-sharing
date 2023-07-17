// import React, { useEffect, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, Stack, Container, Col, Row, Form, Button } from "react-bootstrap";
// import Table from 'react-bootstrap/Table';
// import * as Api from "../../api";


// const UserAwardEdit = ({ award, setIsEditing, isEditable }) => {
//     const [awardDate, setAwardDate] = useState(award.awardDate);
//     const [issuer, setIssuer] = useState(award.issuer);
//     const [title, setTitle] = useState(award.title);

  
//     //수상내역 추가하기ㄴ
//     // const addAward = () => {
//     //   const award = {
//     //     awardDate: awardDate,
//     //     issuer: issuer,
//     //     title: title,
//     //   };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       // "users/유저id" 엔드포인트로 PUT 요청함.
//       const res = await Api.put(`award/${award.author}`, {
//         awardDate,
//         issuer,
//         title
//       });
//       // 유저 정보는 response의 data임.
//       const updateAward = res.data;
//       // 해당 유저 정보로 user을 세팅함.
//      updateAward(award._id, {updateData})
  
//       // isEditing을 false로 세팅함.
//       setIsEditing(false);
//     };

  
    
//     return (
//       <Container>
//           <h1>수상내역 관리</h1>
//             <Row className="justify-content-md-center mt-5">
//               <Col lg={8}>
//                 <Form  onSubmit={handleSubmit}>
//                  <Form.Group>
//                   <Form.Label>수상 일자</Form.Label> <br />
//                     <input
//                       type="date"
//                       id="awardDate"
//                       value={awardDate}
//                       placeholder="yyyy.mm.dd"
//                       onChange={(e) => setAwardDate(e.target.value)}
//                       required
//                     /> <br />
//                   <Form.Label>주최</Form.Label> <br />
//                     <input
//                       type="text"
//                       id="issuer"
//                       value={issuer}
//                       placeholder="주최사를 입력해주세요"
//                       onChange={(e) => setIssuer(e.target.value)}
//                       required
//                     /> <br />
//                   <Form.Label>수상내용</Form.Label> <br />
//                     <input
//                       type="text"
//                       id="title"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       placeholder="내용을 입력해주세요"
//                       required
//                     /> 
//                 </Form.Group>
  
  
//                 <Form.Group as={Row} className="mt-3 text-center">
//                   <Col sm={{ span: 20 }}>
//                     <Button variant="primary" type="submit" onClick={addAward}>
//                     {isEditing  ? '완료' : '추가'}
//                     </Button>
//                   </Col>
//                 </Form.Group>

// {/* 
//                 <Stack gap={3}>
//                   <div className="p-2"><AwardStack></AwardStack></div>
//                   <div className="p-2"><AwardStack></AwardStack></div>
                 
//                 </Stack>

//                */}
// {/* 
//                 {awardData.length === 0 ? (
//                   <p>수상내역이 없습니다.</p>
//                 ) : (
//                   <Table striped bordered hover size="sm"e> 
//                     <thead>
                    
//                     </thead>
//                     <tbody>
//                       {awardData.map((award, index) => (
//                         <tr key={index}>
//                           <td>수상일자
//                             {award.awardDate.getFullYear()}.
//                             {award.awardDate.getMonth() + 1}.
//                             {award.awardDate.getDate()}
//                           </td>
//                           <td>주최사 : {award.issuer}</td>
//                           <td>수상내용 : {award.title}</td>
//                           <td>
//                             <Button variant="primary" onClick={() => editAward(index)}>
//                               수정
//                             </Button>
//                           </td>
//                           <td>
//                             <Button variant="danger" onClick={() => deleteAward(index)}>
//                               삭제
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>     
//                 )} */}
//                 </Form>
//               </Col>
//             </Row>
//       </Container>
//   )
// };
// export default UserAwardEdit;
