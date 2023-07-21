import React, { useContext, useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { dateFormat } from "../../lib/dateFormatter";

import * as Api from "../../api";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

const UserAwardEdit = ({ award, setAward, setIsEditing }) => {
  const [date, setDate] = useState(award.date);
  const [issuer, setIssuer] = useState(award.issuer);
  const [title, setTitle] = useState(award.title);
  const [info, setInfo] = useState(award.info);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    isFetchCompleted && setIsFetchCompleted(false);
    try {
      await Api.put(`award/${award._id}`, {
        issuer,
        title,
        info,
        date,
      });

      const res = await Api.get("award", award.author);

      const newAwardData = res.data;

      setAward(newAwardData);
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
    setIsFetchCompleted(true);
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
              주최사
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
                value={dateFormat(new Date(date))}
                placeholder="수상일자를 입력해주세요"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              수상정보
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="info"
                id="info"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="수상정보를 입력해주세요"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="outline-success" size="sm" type="submit">
                수정완료
              </Button>
              {/* <Button
                variant="outline-danger" size="sm"
                onClick={() => setIsEditing(false)}
              >
                취소
              </Button> */}
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserAwardEdit;
