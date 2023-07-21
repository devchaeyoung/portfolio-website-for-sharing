import React, { useContext, useState } from "react";
import * as Api from "../../api";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

const ProjectAdd = ({ getProject, setIsPost, portfolioOwnerId }) => {
  const [title, setTitle] = useState();
  const [role, setRole] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [description, setDescription] = useState();
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const handleSubmit = async (e) => {
    isFetchCompleted && setIsFetchCompleted(false);
    e.preventDefault();

    const projectData = {
      author: portfolioOwnerId,
      title,
      role,
      startDate,
      endDate,
      description,
    };

    await Api.post(`project`, projectData);

    getProject();

    setIsPost(false);
    setIsFetchCompleted(true);
  };

  return (
    <>
      <Card className="mb-2">
        <Card.Title>프로젝트</Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={2}>
                프로젝트
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="프로젝트"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
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

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
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

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
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

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
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
    </>
  );
};
export default ProjectAdd;
