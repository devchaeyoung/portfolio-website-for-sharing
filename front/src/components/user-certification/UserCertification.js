import React from "react";
import UserEditForm from "./UserEditForm";
import UserCerticationCard from "./UserCertificationCard";
import * as Api from "../../api";

import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

function UserCertification({ user }) {
  const Certication = [];
  const navigate = useNavigate();
  return (
    <>
      <Card className="mb-5 ms-5 mr-6" style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          <Row>
            <Col>국제표준 컴퓨터활용능력 ICDL</Col>
            <Col>
              <Button
                variant="outline-success"
                onClick={() => navigate(`/users/${user.id}/certi`)}
              >
                수정
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>한국생산성본부</Col>
            <Col>2023.05.01.</Col>
          </Row>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default UserCertification;
//'/crtfc/:id'
