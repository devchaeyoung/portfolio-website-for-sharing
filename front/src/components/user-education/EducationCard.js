import React from "react";
import { Card, Button } from "react-bootstrap";

const EducationCard = ({
  education,
  isEditable,
  setIsEditing,
  setEducation,
}) => {
  return (
    <Card>
      <Card.Body>희희 교육카드예용</Card.Body>
      <Card.Title>학교이름</Card.Title>
      <Card.Subtitle>{education?.schoolName}</Card.Subtitle>
      <Card.Title>전공</Card.Title>
      <Card.Subtitle>{education?.major}</Card.Subtitle>
      <Card.Title>재학 기간</Card.Title>
      <Card.Subtitle>{education?.crnt}</Card.Subtitle>
      {isEditable && (
        <Button
          variant="outline-info"
          size="sm"
          onClick={() => setIsEditing(true)}
        >
          편집
        </Button>
      )}
    </Card>
  );
};

export default EducationCard;
