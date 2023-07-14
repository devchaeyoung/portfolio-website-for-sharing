import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCertificationEdit from "./UserCertificationEdit";
import UserCerticationCard from "./UserCertificationCard";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function UserCertification({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("crtfc", portfolioOwnerId).then((res) => {
      setEducations(res.data);
    });
  }, [portfolioOwnerId]);
  return (
    <>
      {educations.map((certification) =>
        isEditing ? (
          <UserCertificationEdit
            key={certification._id}
            certification={certification}
            setIsEditing={setIsEditing}
            setEducation={setEducations}
          />
        ) : (
          <UserCerticationCard
            key={certification._id}
            certification={certification}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          />
        )
      )}
      <Card className="mb-5 ms-5 mr-6" style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          <Row>
            <Col>국제표준 컴퓨터활용능력 ICDL</Col>
          </Row>
          <Row>
            <Col>한국생산성본부</Col>
            <Col>2023.05.01.</Col>
          </Row>
          <Col>
            <Button
              variant="outline-success"
              // onClick={() => navigate(`/users/${user.id}/certi`)}
            >
              편집
            </Button>
          </Col>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default UserCertification;
//'/crtfc/:id'
