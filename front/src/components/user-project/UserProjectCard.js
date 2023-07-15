import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

const UserProjectCard = () => {
  
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
          <Card.Title>프로젝트내역</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{project?.title}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{project?.role}</Card.Subtitle>
          <Card.Text>{project?.description}</Card.Text>
          {isEditable && (
              <Col>
                  <Row className="mt-3 text-center text-info">
                      <Col sm={{ span: 20 }}>
                          <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          >
                          편집
                          </Button>
                      </Col>
                  </Row>
              </Col>
          )}
      </Card.Body>
    </Card>
  )
};

export default UserProjectCard;
