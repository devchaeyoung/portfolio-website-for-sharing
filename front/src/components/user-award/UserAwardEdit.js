import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Container, Col, Row, Form, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import * as Api from "../../api";


  const UserAwardEdit = ({ award,  setAward, isEditable}) => {

    // const [awardDate, setAwardDate] = useState('');
    const [issuer, setIssuer] = useState('');
    const [title, setTitle] = useState('');
    const [isEditing, setIsEditing]= useState(false);
  
    // //수상내역 추가하기ㄴ
    // const addAward = () => {
    //   const award = {
    //     awardDate: new Date(awardDate),
    //     issuer: issuer,
    //     title: title,
    //   };
  
    //   if (editIndex !== -1) {
    //     const updatedData = [...awardData];
    //     updatedData[editIndex] = award;
    //     setAwardData(updatedData);
    //     setEditIndex(-1);
    //   } else {
    //     setAwardData([...awardData, award]);
    //   }
  
    //   setAwardDate('');
    //   setIssuer('');
    //   setTitle('');
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // "users/유저id" 엔드포인트로 PUT 요청함.
        const res = await Api.get(`award/${award.id}`, {
          // awardData,
          issuer,
          title
        });
        // 유저 정보는 response의 data임.
        const updateAward = res.data;
        // 해당 유저 정보로 user을 세팅함.
        setAward(updateAward);
    
        // isEditing을 false로 세팅함.
        setIsEditing(false);
      };

      
  
    return (
        <Card>
        <Card.Title>수상 내역</Card.Title>

        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>수상내역</Form.Label>
        <Form.Control />{award?.title} <Form.Control />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        </Form>

  
        {isEditable && (
          <Col sm={{ span: 20 }}>
            <Button
              className="me-3"
              variant="outline-success"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              편집
            </Button>
            {/* <Button
              variant="outline-success"
              size="sm"
              onClick={() => deleteAwardt(award._id)}
            >
              삭제
            </Button> */}
          </Col>
        )}
      </Card>
    );
};
//     // const [awardDate, setAwardDate] = useState(award.awardDate);
//     const [issuer, setIssuer] = useState(award.isuuer);
//     const [title, setTitle] = useState(award.title);
//     const [isEditing, setIsEditing] = useState(false);

  
   
//     // const addAward = () => {
//     //   const award = {
//     //     awardDate: awardDate,
//     //     issuer: issuer,
//     //     title: title,
//     //   };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       // "users/유저id" 엔드포인트로 PUT 요청함.
//       const res = await Api.put(`award/${award._id}`, {
//         // awardDate,
//         issuer,
//         title
//       });
//       // 유저 정보는 response의 data임.
//       const updateData = res.data;
//       editAward(award._id, updateData)
//       setIsEditing(false);
//     };

  
    
//     return (
   
//             <Card className="mb-2">
//               <Card.Title>수상내역</Card.Title>

//               <Card.Body>
//                 <Form onSubmit={handleSubmit}>
                          
//                   <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                   <Form.Label column sm={2}>
//                     수상내용
//                   </Form.Label>
//                   <Col sm={10}>
//                   <Form.Control 
//                     type="text"
//                     id="title"
//                     value={title}
//                     placeholder="수상내용을 입력해주세요"
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                   />
//                   </Col>
//                   </Form.Group>

//                   <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                   <Form.Label column sm={2}>
//                     주최
//                   </Form.Label>
//                   <Col sm={10}>
//                   <Form.Control 
//                     type="text"
//                     id="issuer"
//                     value={issuer}
//                     placeholder="주최사를 입력해주세요"
//                     onChange={(e) => setIssuer(e.target.value)}
//                     required
//                   />
//                   </Col>
//                   </Form.Group>

//                   {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                   <Form.Label column sm={2}>
//                     수상일자
//                   </Form.Label>
//                   <Col sm={10}>
//                   <Form.Control 
//                     type="date"
//                     id="awardDate"
//                     value={issuer}
//                     placeholder="수상일자를 입력해주세요"
//                     onChange={(e) => setAwardDate(e.target.value)}
//                     required
//                   />
//                   </Col>
//                   </Form.Group> */}
  
//                   <Form.Group as={Row} className="mt-3 text-center">
//                     <Col sm={{ span: 20 }}>
//                       <Button variant="outline-success" onClick={()=> setIsEditing(false)}>
//                         추가
//                       </Button>
//                     </Col>
//                   </Form.Group>s

//                 </Form>
//              </Card.Body>
//            </Card> 

            
//   )
// }

export default UserAwardEdit;
