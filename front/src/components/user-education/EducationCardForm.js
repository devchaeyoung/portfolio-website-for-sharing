import React from "react";
import { Card, Button, Col } from "react-bootstrap";

const EducationCardForm = ({
  education,
  setIsEditing,
  isEditable,
  deleteEducation,
  isPost,
}) => {
  return (
    <Card>
      <Card.Body>교육카드예용</Card.Body>
      <Card.Title>학교이름</Card.Title>
      <Card.Subtitle>{education?.title}</Card.Subtitle>
      <Card.Title>전공</Card.Title>
      <Card.Subtitle>{education?.major}</Card.Subtitle>
      <Card.Title>입학</Card.Title>
      <Card.Subtitle>{education?.startDate}</Card.Subtitle>
      <Card.Title>졸업</Card.Title>
      <Card.Subtitle>{education?.endDate}</Card.Subtitle>
      <Card.Title>CRNT</Card.Title>
      <Card.Subtitle>{education?.crnt}</Card.Subtitle>
      {isEditable && (
        <Col sm={{ span: 20 }}>
          <Button
            className="me-3"
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            편집
          </Button>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => deleteEducation(education._id)}
          >
            삭제
          </Button>
        </Col>
      )}
    </Card>
  );
};

export default EducationCardForm;
