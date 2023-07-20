import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import ProjectEditForm from "./ProjectEditForm";
import { dateFormat } from "../../lib/dateFormatter";


function ProjectCard({ project, setProject, isEditable }) {
  const { title, role, startDate, endDate, description, author } = project;
  const [isEditing, setIsEditing] = useState(false);

  const deleteProject = async () => {
    await Api.delete(`project/${project._id}`).then(() => {
      Api.get("project", project.author)
        .then((res) => {
          setProject(res.data);
        })
        .catch((err) => {
          if (err.response.data) {
            setProject([]);
            return;
          }

          window.alert("네트워크 에러! 아님 서버 에러!");
        });
    });
  };

  return (
    <Card>
      {isEditing ? (
          <ProjectEditForm
            project={project}
            setProject={setProject}
            setIsEditing={setIsEditing}
          />
      ) : (
        <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Row>
          <Col>역할: {role}</Col>
        </Row>
        <Row>
          <Col>시작: {startDate && dateFormat(new Date(startDate))}</Col>
        </Row>
        <Row>
          <Col>종료: {endDate && dateFormat(new Date(endDate))}</Col>
        </Row>
        <Row>
          <Col>내용: {description}</Col>
        </Row>
      </Card.Body>
      )}

      {isEditable && !isEditing && (
        <Button
          variant="outline-success"
          type="submit"
          onClick={() => {
            setIsEditing((prev) => !prev);
          }}
        >
          수정
        </Button>
        )}
         {isEditable && (
        <Button variant="outline-success" type="submit" onClick={deleteProject}>
        삭제
      </Button>
     )}
    </Card>
  
  );
};

export default ProjectCard;
