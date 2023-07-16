import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationEditForm = ({ education, setIsEditing, editEducation }) => {
  const [title, setTitle] = useState(education.title);
  const [major, setMajor] = useState(education.major);
  const [startDate, setStartDate] = useState(education.startDate);
  const [endDate, setEndDate] = useState(education.endDate);
  const [crnt, setCrnt] = useState(education.crnt);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.put(`education/${education.author}`, {
      title,
      major,
      startDate,
      endDate,
      crnt,
    });

    const updateData = res.data;
    editEducation(education._id, updateData);
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="학교 이름"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="전공"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="입학"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="졸업"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="입학"
              value={crnt}
              onChange={(e) => setCrnt(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="입학"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default EducationEditForm;
