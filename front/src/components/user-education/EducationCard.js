import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";

const EducationCard = ({ user, isEditable, setIsEditing, setUser }) => {
  return (
    <Card>
      <Card.Body>희희 교육카드예용</Card.Body>
      <Card.Title>학교이름</Card.Title>
      <Card.Subtitle>{user?.name}</Card.Subtitle>
      <Card.Title>전공</Card.Title>
      <Card.Subtitle>{user?.description}</Card.Subtitle>
      <Card.Title>재학 기간</Card.Title>
      <Card.Subtitle>{user?.email}</Card.Subtitle>
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
