import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Col, Row, Form, Button } from "react-bootstrap";
import UserAwardEdit from "./UserAwardEdit";
import * as Api from "../../api";

function UserAwardCard ({award, setAward, setIsEditing, isEditable }) {

    const [awardData, setAwardData] = useState([]);
    const [awardDate, setAwardDate] = useState('');
    const [issuer, setIssuer] = useState('');
    const [title, setTitle] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    const deleteAward = async () => {
      if (window.confirm('게시글을 삭제하시겠습니까?')) {
        await Api.delete(`award/${award._id}`).then((res) => {
          alert('삭제되었습니다.');
        });
      }
    };

    return (
        <Card style={{ width: "32rem" }}>
            <Card.Body>
                <Card.Title>수상내역{' '}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">{award?.title}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{award?.issuer}</Card.Subtitle>
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
                                +
                                </Button>
                            </Col>
                            <Col sm={{ span: 20 }}>
                                <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                >
                                -
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