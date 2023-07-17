import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Container, Col, Row, Form, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import * as Api from "../../api";


const UserAwardEdit = ({ award, setIsEditing, updateAward }) => {
    // const [awardDate, setAwardDate] = useState(award.awardDate);
    const [issuer, setIssuer] = useState('');
    const [title, setTitle] = useState('');

  
  
   
    // const addAward = () => {
    //   const award = {
    //     awardDate: awardDate,
    //     issuer: issuer,
    //     title: title,
    //   };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // "users/유저id" 엔드포인트로 PUT 요청함.
      const res = await Api.put(`award/${award._id}`, {
        // awardDate,
        issuer,
        title
      });
      // 유저 정보는 response의 data임.
      const updateData = res.data;
      updateAward(award._id, {updateData})
      setIsEditing(false);
    };

  
    
    return (
   
            <Card className="mb-2">
              <Card.Title>수상내역</Card.Title>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                          
                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    수상내용
                  </Form.Label>
                  <Col sm={10}>
                  <Form.Control 
                    type="text"
                    id="issuer"
                    value={issuer}
                    placeholder="주최사를 입력해주세요"
                    onChange={(e) => setIssuer(e.target.value)}
                    required
                  />
                  </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    주최
                  </Form.Label>
                  <Col sm={10}>
                  <Form.Control 
                    type="text"
                    id="issuer"
                    value={issuer}
                    placeholder="주최사를 입력해주세요"
                    onChange={(e) => setIssuer(e.target.value)}
                    required
                  />
                  </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    수상일자
                  </Form.Label>
                  <Col sm={10}>
                  <Form.Control 
                    type="datet"
                    id="awardDate"
                    value={issuer}
                    placeholder="수상일자를 입력해주세요"
                    onChange={(e) => setIssuer(e.target.value)}
                    required
                  />
                  </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mt-3 text-center">
                    <Col sm={{ span: 20 }}>
                      <Button variant="outline-success" onClick={handleSubmit}>
                        추가
                      </Button>
                    </Col>
                  </Form.Group>

                </Form>
             </Card.Body>
           </Card> 

            
  )
}

export default UserAwardEdit;
