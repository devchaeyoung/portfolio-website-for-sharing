import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Col, Row, Form, Button } from "react-bootstrap";

function UserAwardCard ({ }) {
    const navigate = useNavigate();  
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>수상내역</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{award?.awardDate}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{award?.organizer}</Card.Subtitle>
                <Card.Text>{award?.dawardDate}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default UserAwardCard;