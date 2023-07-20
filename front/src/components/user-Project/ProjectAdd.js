import React, { useContext, useState } from "react";
import * as Api from "../../api";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { ForestStateContext } from "../Portfolio";

const ProjectAdd = ({ setProject, setIsPost, portfolioOwnerId }) => {
  const [title, setTitle] = useState();
  const [role, setRole] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [description, setDescription] = useState();
  const { setForestLength } = useContext(ForestStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      author: portfolioOwnerId,
      title,
      role,
      startDate,
      endDate,
      description,
    };

    const res = await Api.post(`project`, projectData);

    if (res.data) {
      Api.get("project", portfolioOwnerId).then((res) => {
        setProject(res.data);
        if (res.data.length !== 0) {
          setForestLength((prev) => {
            return { ...prev, project: true };
          });
        }
      });
    }

    setIsPost(false);
  };

  return (
    <Card className="mb-2">
      <Card.Title>프로젝트</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              프로젝트
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="프로젝트 명"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              역할
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="역할"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              시작일
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                placeholder="시작일"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              종료일
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                placeholder="종료"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              설명
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="outline-success" onClick={handleSubmit}>
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
export default ProjectAdd;
