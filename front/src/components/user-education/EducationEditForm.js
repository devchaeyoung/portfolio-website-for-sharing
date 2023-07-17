import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationEditForm = ({ education, setIsEditing, editEducation }) => {
  const [title, setTitle] = useState(education.title);
  const [major, setMajor] = useState(education.major);
  const [startDate, setStartDate] = useState(education.startDate);
  const [endDate, setEndDate] = useState(education.endDate);
  const [crnt, setCrnt] = useState(education.crnt);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setError(null);
      const res = await Api.put(`education/${education._id}`, {
        title,
        major,
        startDate,
        endDate,
        crnt,
      });

      const updateData = res.data;
      editEducation(education._id, updateData);
      setIsEditing(false);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            학교
            <Form.Control
              type="text"
              placeholder="학교"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            전공
            <Form.Control
              type="text"
              placeholder="전공"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            입학
            <Form.Control
              type="date"
              placeholder="입학"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            졸업
            <Form.Control
              type="date"
              placeholder="졸업"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            학점
            <Form.Control
              type="text"
              placeholder="학점"
              value={crnt}
              onChange={(e) => setCrnt(e.target.value)}
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
