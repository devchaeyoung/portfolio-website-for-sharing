import React, { useContext, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import ProjectEditForm from "./ProjectEditForm";
import { dateFormat } from "../../lib/dateFormatter";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";
import "../user-certification/UserCertificationCard.style.css";

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
    <div>
      <Card>
        {isEditing ? (
          <ProjectEditForm
            project={project}
            getProject={getProject}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Card.Body className="certification-card">
            <Button
              className="certification-delete-button"
              size="sm"
              variant="outline-success"
              onClick={deleteProject}
            >
              X
            </Button>
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

        <Row>
          {isEditable && !isEditing && (
            <Col sm={{ span: 20 }}>
              <Button
                className="certification-button"
                variant="outline-success"
                type="submit"
                onClick={() => {
                  setIsEditing((prev) => !prev);
                }}
              >
                수정하기
              </Button>

              {/* <Button variant="outline-success"  size="sm" type="submit" onClick={deleteProject}>
          삭제
        </Button> */}
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
}

export default ProjectCard;
