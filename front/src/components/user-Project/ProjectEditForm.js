import React, { useContext, useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { dateFormat } from "../../lib/dateFormatter";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

const ProjectEditForm = ({ project, getProject, setIsEditing }) => {
  const [title, setTitle] = useState(project.title);
  const [role, setRole] = useState(project.role);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
  const [description, setDescription] = useState(project.description);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const handleSubmit = async (e) => {
    isFetchCompleted && setIsFetchCompleted(false);
    e.preventDefault();
    try {
      await Api.put(`project/${project._id}`, {
        title,
        role,
        startDate,
        endDate,
        description,
      });

      getProject();
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
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
                  value={dateFormat(new Date(startDate))}
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
                  value={dateFormat(new Date(endDate))}
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
                내용
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="네용"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="outline-success" type="submit">
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
    </>
  );
};
export default ProjectEditForm;
