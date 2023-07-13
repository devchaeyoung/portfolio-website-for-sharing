import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";

import Navigate from "../nav/Navigate";

const UserCertifictionEdit = () => {
  const navigate = useNavigate();

  const [certification, setCertification] = useState("");
  const [issuers, setIssuers] = useState("");
  const [date, setDate] = useState();

  // 언어 점수 체크박스로 나타나게 만들 예정
  const [langscore, setLangscore] = useState();

  const isCertificationValid = certification.length > 1;
  const isIssuersValid = issuers.length > 0;

  //   const isDateValid = (date.length = 8);
  //   console.log("gdgd");

  const isFormValid = isCertificationValid && isIssuersValid; //&& isDateValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 임의로 만들어두었습니다. 백엔드 자격증 부분 작업완료 업데이트 예정
    try {
      await Api.post("/user/:id/editlicense", {
        certification,
        issuers,
        date,
        langscore,
      });
    } catch (err) {
      console.log("내용 변경에 실패하였습니다.", err);
    }
  };

  return (
    <div>
      <header>
        <Navigate />
      </header>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col lg={10}>
            <Form.Label>자격증</Form.Label>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                value={certification}
                placeholder="어떤 자격증인가요?"
                onChange={(e) => setCertification(e.target.value)}
              ></input>
              {!isCertificationValid && (
                <Form.Text className="text-success">
                  자격증명을 입력하세요
                </Form.Text>
              )}
              <br />
              <Form.Label>발급 기관</Form.Label>
              <input
                type="text"
                class="form-control"
                value={issuers}
                placeholder="발급 기관"
                onChange={(e) => setIssuers(e.target.value)}
              ></input>
              {!isIssuersValid && (
                <Form.Text className="text-success">
                  발급 기관을 입력해주세요
                </Form.Text>
              )}
              <br />
              <Form.Label>발급 날짜</Form.Label>
              <input
                type="text"
                class="form-control"
                value={date}
                placeholder="19990101"
                onChange={(e) => setDate(e.target.value)}
              ></input>
              <Form.Text className="text-success">
                날짜는 양식에 맞춰 입력해주세요
              </Form.Text>
              <br />
              <Form.Label>어학 점수</Form.Label>
              <input
                type="text"
                class="form-control"
                value={langscore}
                placeholder="어학자격증일 경우만"
                onChange={(e) => setLangscore(e.target.value)}
              ></input>
              <Form.Text className="text-success">
                어학자격증이 없으시면 아래 체크박스를 눌러주세요
              </Form.Text>
              <br />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserCertifictionEdit;
