import React, { useContext } from "react";
import { Card, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { LoadingStateContext } from "../../App";

const EDUCATIONINFO = [
  { title: "학교", key: "title" },
  { title: "전공", key: "major" },
  { title: "입학", key: "startDate" },
  { title: "졸업", key: "endDate" },
  { title: "학점", key: "grades" },
];
const EducationCardForm = ({
  education,
  setIsEditing,
  isEditable,
  getEducation,
}) => {
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const handleDelete = async () => {
    try {
      /**삭제api */
      isFetchCompleted && setIsFetchCompleted(false);
      await Api.delete("education", education._id);
      /**정보 다시 가져오는 api */
      getEducation();

      setIsEditing(false);
    } catch (e) {
      console.log(e);
      alert(e);
    }
    setIsFetchCompleted(true);
  };

  return (
    <Card>
      <Card.Body>교육카드</Card.Body>

      {EDUCATIONINFO.map((item) => {
        return (
          <>
            <Card.Title>{item.title} </Card.Title>
            <Card.Subtitle>{education[item.key]}</Card.Subtitle>
          </>
        );
      })}

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
          <Button variant="outline-success" size="sm" onClick={handleDelete}>
            삭제
          </Button>
        </Col>
      )}
    </Card>
  );
};

export default EducationCardForm;
