import React, { useContext, useState } from "react";
import * as Api from "../../api";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { ForestStateContext } from "../Portfolio";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

const UserAwardAdd = ({ setAward, setIsPost, portfolioOwnerId }) => {
  const [date, setDate] = useState("");
  const [issuer, setIssuer] = useState("");
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const { setForestLength } = useContext(ForestStateContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    isFetchCompleted && setIsFetchCompleted(false);
    const awardData = {
      author: portfolioOwnerId,
      date, // 날짜
      issuer, // 주최자
      title, // 수상 제목
      info, // 수상 정보
    };

    const res = await Api.post(`award`, awardData);

    if (res.data) {
      Api.get("award", portfolioOwnerId).then((res) => {
        setAward(res.data);
        if (res.data.length !== 0) {
          setForestLength((prev) => {
            return { ...prev, award: true };
          });
        }
      });
    }

    // .then은 API가 호출에 성공했을 때 그 안에 있는 동작을 실행하겠다.
    // try catch

    setIsFetchCompleted(true);
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
                value={date}
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
              <Button
                variant="outline-success"
                className="me-3"
                onClick={handleSubmit}
              >
                추가
              </Button>
              <Button
                variant="outline-success"
                onClick={() => setIsPost(false)}
              >
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserAwardAdd;
