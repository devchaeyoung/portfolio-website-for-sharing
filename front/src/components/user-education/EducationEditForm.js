import React, { useContext, useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

const EducationEditForm = ({ education, setIsEditing, getEducation }) => {
  const [title, setTitle] = useState(education.title);
  const [major, setMajor] = useState(education.major);
  const [startDate, setStartDate] = useState(education.startDate);
  const [endDate, setEndDate] = useState(education.endDate);
  const [grades, setGrades] = useState(education.grades);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    isFetchCompleted && setIsFetchCompleted(false);
    try {
      await Api.put(`education/${education._id}`, {
        title,
        major,
        startDate,
        endDate,
        grades,
      });
      getEducation();

      setIsEditing(false);
    } catch (e) {
      console.log(e);
      alert(e);
    }
    setIsFetchCompleted(true);
  };

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
              type="number"
              step="0.1"
              placeholder="학점"
              value={grades}
              onChange={(e) => setGrades(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="outline-success" type="submit" className="me-3">
                수정완료
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default EducationEditForm;
