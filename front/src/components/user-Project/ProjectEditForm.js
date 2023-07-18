import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const ProjectEditForm = ({ project, setIsEditing, editProject,setIsPost, addProject }) => {
  const [title, setTitle] = useState();
  const [role, setRole] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
    
      setError(null);
      const res = await Api.put(`project/${project._id}`, {
        title,
        role,
        startDate,
        endDate,
        description,
      });
      const updateData = res.data;
      addProject(updateData);
      setIsPost(false);
    } catch (e) {
      setError(e);
    }
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

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="outline-success" type="submit" className="me-3">
                확인
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
};
export default ProjectEditForm;
