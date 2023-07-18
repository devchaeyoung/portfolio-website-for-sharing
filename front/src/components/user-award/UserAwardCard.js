import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Col, Row, Form, Button } from "react-bootstrap";
import UserAwardEdit from "./UserAwardEdit";
import * as Api from "../../api";

function UserAwardCard ({award, setAward, setIsEditing, isEditable, isNetwork}) {

    const [awardData, setAwardData] = useState([]);
    const [awardDate, setAwardDate] = useState('');
    const [issuer, setIssuer] = useState('');
    const [title, setTitle] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
  
    //수상내역 추가하기ㄴ
    const addAward = () => {
      const award = {
        awardDate: new Date(awardDate),
        issuer: issuer,
        title: title,
      };
  
      if (editIndex !== -1) {
        const updatedData = [...awardData];
        updatedData[editIndex] = award;
        setAwardData(updatedData);
        setEditIndex(-1);
      } else {
        setAwardData([...awardData, award]);
      }
  
      setAwardDate('');
      setIssuer('');
      setTitle('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // "users/유저id" 엔드포인트로 PUT 요청함.
        const res = await Api.put(`award/${award.id}`, {
          awardData,
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
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>수상내역{' '}<button onClick={addAward}>+</button></Card.Title>
          
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
