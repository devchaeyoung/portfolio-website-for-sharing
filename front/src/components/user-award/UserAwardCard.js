import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Col, Row, Form, Button } from "react-bootstrap";
import UserAwardEdit from "./UserAwardEdit";
import * as Api from "../../api";

function UserAwardCard ({award, setAward, isEditable, updateAward, deleteAward}) {

  const [awardDate, setAwardDate] = useState('');
  const [issuer, setIssuer] = useState('');
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.get(`award/${award.id}`, {
      // awardData,
      issuer,
      title
    });
    // 유저 정보는 response의 data임.
    const updateAward = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setAward(updateAward);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  
    return (
        <Card>
        <Card.Body>수상 내역</Card.Body>
        <Card.Title>프로젝트 명</Card.Title>
        <Card.Subtitle>{award?.itle}</Card.Subtitle>
        <Card.Title>역할</Card.Title>
        <Card.Subtitle>{award?.issuer}</Card.Subtitle>
        <Card.Title>수상일자</Card.Title>
        <Card.Subtitle>{award?.awardDate}</Card.Subtitle>

        {isEditable && (
          <Col sm={{ span: 20 }}>
            <Button
              className="me-3"
              variant="outline-success"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              편집
            </Button>
            {/* <Button
              variant="outline-success"
              size="sm"
              onClick={() => deleteAwardt(award._id)}
            >
              삭제
            </Button> */}
          </Col>
        )}
      </Card>
    );
};

export default UserAwardCard;
