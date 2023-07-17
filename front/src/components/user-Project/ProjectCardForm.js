import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

const ProjectCardForm = ({ project, setIsEditing, isEditable }) => {
  // const deleteProject = async () => {
  //   const res = await Api.put(`project/${project._id}`, {
  //       alert('삭제되었습니다.');
  // }};

  const deleteProject = async () => {
      await Api.delete(`project/${project._id}`).then((res) => {
        alert('삭제되었습니다.');
      });
  };
  


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
            onClick={() => deleteProject(project._id)}
          >
            삭제
          </Button>
        </Col>
      )}
    </Card>
  );
};

export default ProjectCardForm;
