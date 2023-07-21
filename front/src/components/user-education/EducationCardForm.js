import React, { useContext } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import * as Api from "../../api";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";
import { dateFormat } from "../../lib/dateFormatter";
import "./EducationCardForm.style.css";

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
    isFetchCompleted && setIsFetchCompleted(false);
    try {
      /**삭제api */
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
    <div className="education">
      <div className="education-card">
        <Form className="education-card">
          {isEditable && (
            <Button
              className="education-delete-button"
              variant="outline-success"
              onClick={handleDelete}
            >
              X
            </Button>
          )}
          {EDUCATIONINFO.map((item) => {
            return (
              <>
                <Row className="user-portfolio-item">
                  <Col lg={5}>{item.title}</Col>
                  <Col>
                    {item.key !== "startDate" && item.key !== "endDate"
                      ? education[item.key]
                      : dateFormat(new Date(education[item.key]))}
                  </Col>
                </Row>
              </>
            );
          })}

          {isEditable && (
            <Button
              className="education-button"
              variant="outline-success"
              onClick={() => setIsEditing(true)}
            >
              수정하기
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default EducationCardForm;
