import React, { useContext, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

const EducationInputForm = ({ setIsPost, getEducation }) => {
  const [title, setTitle] = useState();
  const [major, setMajor] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [grades, setGrades] = useState();
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    isFetchCompleted && setIsFetchCompleted(false);
    try {
      await Api.post("education", {
        title,
        major,
        startDate,
        endDate,
        grades,
      });

      getEducation();

      setIsPost(false);
    } catch (e) {
      console.log(e);
      alert(e);
    }
    setIsFetchCompleted(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Label column lg={2}>
          학교
        </Form.Label>
        <Col>
          <Form.Control
            type="text"
            className="form-control"
            value={title}
            placeholder="학교 이름"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Form.Text className="text-success">학교를 입력하세요</Form.Text>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={2}>
          전공
        </Form.Label>
        <Col>
          <Form.Control
            type="text"
            className="form-control"
            value={major}
            placeholder="전공"
            onChange={(e) => setMajor(e.target.value)}
          />
        </Col>
        <Form.Text className="text-success">전공을 입력하세요</Form.Text>
      </Row>
      <br />

      <Row>
        <Form.Label column lg={2}>
          입학 날짜
        </Form.Label>
        <Col>
          <Form.Control
            type="date"
            className="form-control"
            value={startDate}
            placeholder="입학"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Col>
        <Form.Text className="text-success">입학 날짜를 선택하세요</Form.Text>
      </Row>
      <br />

      <Row>
        <Form.Label column lg={2}>
          졸업날짜
        </Form.Label>
        <Col>
          <Form.Control
            type="date"
            className="form-control"
            value={endDate}
            placeholder="졸업 날짜"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Col>
        <Form.Text className="text-success">
          졸업날짜 혹은 졸업 예정 날짜를 선택해주세요
        </Form.Text>
      </Row>
      <br />

      <Row>
        <Form.Label column lg={2}>
          학점
        </Form.Label>
        <Col>
          <Form.Control
            type="number"
            step="0.1"
            className="form-control"
            value={grades}
            placeholder="학점"
            onChange={(e) => setGrades(e.target.value)}
          />
        </Col>
        <Form.Text className="text-success">학점을 입력하세요</Form.Text>
      </Row>
      <br />

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="outline-success" type="submit" className="me-3">
            확인
          </Button>
          <Button
            className="me-3"
            variant="outline-danger"
            onClick={() => setIsPost(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};
export default EducationInputForm;
