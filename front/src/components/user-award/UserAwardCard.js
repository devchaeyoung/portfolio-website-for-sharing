import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Col, Row, Form, Button } from "react-bootstrap";

function UserAwardCard ({award, setIsEditing, isEditable}) {
    const navigate = useNavigate();  
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>수상내역</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{award?.awardDate}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{award?.organizer}</Card.Subtitle>
                <Card.Text>{award?.dawardDate}</Card.Text>
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
    );
};

export default UserAwardCard;