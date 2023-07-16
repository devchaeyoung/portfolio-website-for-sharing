import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

const EducationCardForm = ({
  education,
  setIsEditing,
  isEditable,
  deleteEducation,
}) => {
  const handleDelete = () => {
    Api.delete("education", education._id);
    deleteEducation(education._id);
  };
  return (
    <Card>
      <Card.Body>교육카드</Card.Body>
      <Card.Title>학교이름</Card.Title>
      <Card.Subtitle>{education?.title}</Card.Subtitle>
      <Card.Title>전공</Card.Title>
      <Card.Subtitle>{education?.major}</Card.Subtitle>
      <Card.Title>입학</Card.Title>
      <Card.Subtitle>{education?.startDate}</Card.Subtitle>
      <Card.Title>졸업</Card.Title>
      <Card.Subtitle>{education?.endDate}</Card.Subtitle>
      <Card.Title>학점</Card.Title>
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
          <Button variant="outline-info" size="sm" onClick={handleDelete}>
            삭제
          </Button>
        </Col>
      )}
    </Card>
  );
};

export default EducationCardForm;
