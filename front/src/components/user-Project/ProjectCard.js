import React, { useContext, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import ProjectEditForm from "./ProjectEditForm";
import { dateFormat } from "../../lib/dateFormatter";
import { LoadingStateContext } from "../../App";

function ProjectCard({ project, getProject, isEditable }) {
  const { title, role, startDate, endDate, description, author } = project;
  const [isEditing, setIsEditing] = useState(false);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const deleteProject = async () => {
    isFetchCompleted && setIsFetchCompleted(false);
    try {
      await Api.delete(`project/${project._id}`);
      getProject();
    } catch (e) {
      console.log(e);
      window.alert("네트워크 에러! 아님 서버 에러!");
    }
    setIsFetchCompleted(true);
  };

  return (
    <>
    <Card>
      {isEditing ? (
        <ProjectEditForm
          project={project}
          getProject={getProject}
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
        <Col >
        <Button
          variant="outline-success"
          type="submit"
          onClick={() => {
            setIsEditing((prev) => !prev);
          }}
        >
          수정
        </Button>
        <Button variant="outline-success" type="submit" onClick={deleteProject}>
          삭제
        </Button>
        </Col>
      )}
    </Card>
    </>
  );
}

export default ProjectCard;
