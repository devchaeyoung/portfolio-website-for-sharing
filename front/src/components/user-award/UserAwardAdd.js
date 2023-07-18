import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Button, Form, Card, Col, Row } from "react-bootstrap";

const UserAwardAdd  = ({ setAward, setIsPost }) => {
    const [date, setDate] = useState('');
    const [issuer, setIssuer] = useState('');
    const [title, setTitle] = useState('');
 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const awardData = {
            date,
            issuer,
            title,
        };

        const res = await Api.post(`award`, awardData);
            const newAwardData = res.data;
            setAward(newAwardData);

    setIsPost(false);
    }


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

                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    수상일자
                  </Form.Label>
                  <Col sm={10}>
                  <Form.Control 
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                  </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mt-3 text-center">
                    <Col sm={{ span: 20 }}>
                      <Button variant="outline-success" onClick={handleSubmit}>
                        추가
                      </Button>
                      <Button variant="outline-success" onClick={() => setIsPost(false)}>
                        취소
                      </Button>
                    </Col>
                  </Form.Group>

                </Form>
             </Card.Body>
           </Card> 

  );

 }

export default UserAwardAdd;
