import React, { useContext, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import UserAwardEdit from "./UserAwardEdit";
import { ForestStateContext } from "../Portfolio";

function UserAwardCard({ award, setAward, isEditable }) {
  const { title, issuer, date, info, author } = award;
  const [isEditing, setIsEditing] = useState(false);
  const { setForestLength } = useContext(ForestStateContext);
  const deleteAward = async () => {
    try {
      await Api.delete(`award/${award._id}`);
      const res = Api.get(`awrard`, author);
      console.log("이건 유저 어워드 카드 레스 데이타", res.data);
      setAward(res.data);

      if (!res.data) {
        setForestLength((prev) => {
          return { ...prev, award: false };
        });
      }
    } catch (e) {
      if (e.response.data) {
        setAward([]);
        return;
      }
      window.alert("네트워크 에러! 또는 서버 에러!");
    }
  };

  // 포트폴리오오너 아이디가, 사용자의 아이디.
  return (
    <Card>
      {isEditing ? (
        <UserAwardEdit
          award={award}
          setAward={setAward}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Row>
            <Col>주최사: {issuer}</Col>
          </Row>
          <Row>
            <Col>발급일: {date}</Col>
          </Row>
          <Row>
            <Col>수상 정보: {info}</Col>
          </Row>
        </Card.Body>
      )}

      {isEditable && !isEditing && (
        <Button
          variant="outline-success"
          type="submit"
          onClick={() => {
            setIsEditing((prev) => !prev);
          }}
        >
          수정하기
        </Button>
      )}
      <Button variant="outline-success" type="submit" onClick={deleteAward}>
        삭제하기
      </Button>
    </Card>
  );
}

export default UserAwardCard;
