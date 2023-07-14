import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationEditForm = ({ education, setIsEditing, setEducation }) => {
  //education 완성되면 edu.title
  const [schoolName, setSchoolName] = useState();
  //edu.major
  const [major, setMajor] = useState();

  const [crnt, setCrnt] = useState();

  //awards로 테스트

  const [title, setTitle] = useState(education.title);

  const [info, setInfo] = useState(education.info);

  const [issuer, setIssuer] = useState(education.issuer);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.put(`award/${education._id}`, {
      title,
      info,
      issuer,
    });

    const updateEducation = res.data;

    setEducation(updateEducation);

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
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="재학기간"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
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
