import React from "react";
import { Card, Button } from "react-bootstrap";

const ProjectCard = ({ project, setIsEditing, isEditable }) => {
  return (
    <Card>
      <Card.Body>프로젝트 카드</Card.Body>
      <Card.Title>프로젝트 명</Card.Title>
      <Card.Subtitle>{project?.title}</Card.Subtitle>
      <Card.Title>역할</Card.Title>
      <Card.Subtitle>{project?.role}</Card.Subtitle>
      <Card.Title>시작</Card.Title>
      <Card.Subtitle>{project?.startDate}</Card.Subtitle>
      <Card.Title>종료</Card.Title>
      <Card.Subtitle>{project?.endDate}</Card.Subtitle>
      <Card.Title>설명</Card.Title>
      <Card.Subtitle>{project?.description}</Card.Subtitle>
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

export default ProjectCard;
