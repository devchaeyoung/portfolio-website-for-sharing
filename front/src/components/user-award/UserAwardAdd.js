import React, { useState, useEffect } from "react";
import UserAwardEdit from "./UserAwardEdit";
import UserAwardCard from "./UserAwardCard";
import * as Api from "../../api";
import { Card, Container, Col, Row, Form, Button } from "react-bootstrap";


function AwardAdd ({ setIsPost, addAward }) {
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
      const res = await Api.post("award", {
        // awardDate,
        issuer,
        title
      });
      // 유저 정보는 response의 data임.
      const updateData = res.data;
      addAward(updateData)
      setIsPost(false);
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
                    id="title"
                    value={title}
                    placeholder="수상내용을 입력해주세요"
                    onChange={(e) => setTitle(e.target.value)}
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

                  {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    수상일자
                  </Form.Label>
                  <Col sm={10}>
                  <Form.Control 
                    type="date"
                    id="awardDate"
                    value={issuer}
                    placeholder="수상일자를 입력해주세요"
                    onChange={(e) => setAwardDate(e.target.value)}
                    required
                  />
                  </Col>
                  </Form.Group> */}
  
                  <Form.Group as={Row} className="mt-3 text-center">
                    <Col sm={{ span: 20 }}>
                      <Button variant="outline-success" onClick={() => setIsPost(false)}>
                        수상 내역 추가
                      </Button>
                    </Col>
                  </Form.Group>

                </Form>
             </Card.Body>
           </Card>
            
  )
}

export default AwardAdd;
