import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

function UserCertificationCard({ certification, setIsEditing, isEditable }) {
  return (
    <>
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
          {isEditable && (
            <Button
              variant="primary"
              type="submit"
              onClick={() => setIsEditing(true)}
            >
              등록하기
            </Button>
          )}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default UserCertificationCard;
