import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Col, Row, Form, Button } from "react-bootstrap";
import UserAwardAdd from "./UserAwardAdd";
import UserAwardEdit from "./UserAwardEdit";
import * as Api from "../../api";

function UserAwardCard ({award, setAward, isEditable }) {

    const [date, setDate] = useState('');
    const [issuer, setIssuer] = useState('');
    const [title, setTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
  

    const handleSubmit = async (e) => {
        e.preventDefault();
    
       
        const res = await Api.get(`award/${award.id}`, {
          // awardData,
          issuer,
          title
        });

        const updateAward = res.data;
        setAward(updateAward);
    
       
        setIsEditing(false);
    };

    

    const deleteAward = async () => {
      const res = await Api.delete(`award/${award._id}`);

      deleteAward(res.data);
    };
      
    
      
  
    return (
      <>
      {isEditing ? (
        <UserAwardEdit
          award={award}
          setIsEditing={setIsEditing}
          setAward={setAward}
        />
      ) : (
        <UserAwardCard
          award={award}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          setAward={setAward}
        />
      )}


      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Row>
            <Col>즈최사: {issuer}</Col>
          </Row>
          <Row>
            <Col>
              발급일: {date}
            </Col>
          </Row>

        </Card.Body>
        {isEditable && (
          <Button
            variant="outline-success"
            type="submit"
            onClick={handleSubmit}
          >
            {isEditing ? "수정완료" : "수정하기"}
          </Button>
        )}
      </Card>
 </>                 
)
}
  


export default UserAwardCard;
