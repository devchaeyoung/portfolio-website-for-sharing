import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Container, Col, Row, Form, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import * as Api from "../../api";


const UserAwardEdit = ({ award, setAward, setIsEditing, setIsEfitable }) => {
    const [date, setDate] = useState(award.awardDate);
    const [issuer, setIssuer] = useState(award.issuer);
    const [title, setTitle] = useState(award.title);
    

    const handleSubmit = async (e) => {
      e.preventDefault();
    try{
     
      await Api.put(`award/${award._id}`, {
        date,
        issuer,
        title
      }).then((res) => res.data);

      const res = await Api.get(`award`, award.author);
      const newAwardData = res.data;
      setAward(newAwardData);
      setIsEditing(false);
      } catch (e) {
        console.log(e);
      }
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

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            수상일자
          </Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="date"
            id="date"
            value={date}
            placeholder="수상일자를 입력해주세요"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="outline-success">
                추가
              </Button>
              <Button variant="outline-success" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>

        </Form>
      </Card.Body>
    </Card> 
  )
}

export default UserAwardEdit;
