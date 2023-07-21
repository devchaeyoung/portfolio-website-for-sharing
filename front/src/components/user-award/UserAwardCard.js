import React, { useContext, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import UserAwardEdit from "./UserAwardEdit";
import { dateFormat } from "../../lib/dateFormatter";
import { ForestStateContext } from "../Portfolio";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

function UserAwardCard({ award, setAward, isEditable }) {
  const { title, issuer, date, info, author } = award;
  const [isEditing, setIsEditing] = useState(false);
  const { setForestLength } = useContext(ForestStateContext);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const deleteAward = async () => {
    isFetchCompleted && setIsFetchCompleted(false);
    try {
      await Api.delete(`award/${award._id}`);
      const res = Api.get(`awrard`, author);
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
    setIsFetchCompleted(true);
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
        <div>
          <Card.Body className="certification-card">
            <Button
              // className="certification-delete-button"
              className="certification-delete-button"
              variant="outline-success"
              onClick={deleteAward}
            >
              X
            </Button>
            <Card.Title>{title}</Card.Title>
            <Row>
              <Col>주최사: {issuer}</Col>
            </Row>
            <Row>
              <Col>발급일: {date && dateFormat(new Date(date))}</Col>
            </Row>
            <Row>
              <Col>수상 정보: {info}</Col>
            </Row>
          </Card.Body>
        </div>
      )}

      {isEditable && !isEditing && (
        <Col>
          <Button
            variant="outline-success"
            type="submit"
            className="certification-button"
            onClick={() => {
              setIsEditing((prev) => !prev);
            }}
          >
            {isEditing ? "수정완료" : "수정하기"}
          </Button>

          {/* <Button variant="outline-success" type="submit" size="sm" onClick={deleteAward}>
          삭제
        </Button> */}
        </Col>
      )}
    </Card>
  );
}

export default UserAwardCard;
