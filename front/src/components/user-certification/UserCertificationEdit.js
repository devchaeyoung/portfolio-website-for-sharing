import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";

import Navigate from "../nav/Navigate";

const UserCertificationEdit = ({
  certification,
  setIsEditing,
  setCertification,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(certification.title);
  const [licence, setLicence] = useState(certification.licence);
  const [issuers, setIssuers] = useState(certification.issuers);
  const [issureDate, setIssureDate] = useState(certification.issureDate);
  const [langscore, setLangscore] = useState(certification.langscore);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`crtfc/${certification.id}`, {
      title,
      licence,
      issuers,
      issureDate,
      langscore,
    });
    // 유저 정보는 response의 data임.
    const updateCertification = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setCertification(updateCertification);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col lg={10}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>자격증</Form.Label>
            <input
              type="text"
              class="form-control"
              value={title}
              placeholder="어떤 자격증인가요?"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <Form.Text className="text-success">
              자격증명을 입력하세요
            </Form.Text>
            <br />
            <Form.Label>자격증 번호</Form.Label>
            <input
              type="text"
              class="form-control"
              value={licence}
              placeholder="자격증 번호를 입력해주세요"
              onChange={(e) => setLicence(e.target.value)}
            ></input>
            <Form.Text className="text-success">
              하이폰(-) 띄어쓰기를 제외하고 입력해주세요
            </Form.Text>
            <br />
            <Form.Label>발급 기관</Form.Label>
            <input
              type="text"
              class="form-control"
              value={issuers}
              placeholder="발급 기관"
              onChange={(e) => setIssuers(e.target.value)}
            ></input>
            <Form.Text className="text-success">
              발급 기관을 입력해주세요
            </Form.Text>
            <br />
            <Form.Label>발급 날짜</Form.Label>
            <input
              type="text"
              class="form-control"
              value={issureDate}
              placeholder="19990101"
              onChange={(e) => setIssureDate(e.target.value)}
            ></input>
            <Form.Text className="text-success">
              날짜는 양식에 맞춰 입력해주세요
            </Form.Text>
            <br />

            <input
              class="form-check-input"
              type="checkbox"
              className="postScore"
              id="flexCheckDisabled"
            ></input>
            <Form.Text>어학 점수 입력하기</Form.Text>
            <Form.Group>
              <Form.Label>어학 점수</Form.Label>
              <input
                type="text"
                class="form-control"
                value={langscore}
                placeholder="어학자격증을 경우 위 체크박스를 눌러 입력해주세요"
                onChange={(e) => setLangscore(e.target.value)}
              ></input>
              <Form.Text className="text-success">
                숫자만 입력해주세요
              </Form.Text>
            </Form.Group>

            <br />
            {/* !!!! */}
          </Form.Group>
          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                type="submit"
                disabled={false}
                onClick={(handleSubmit) => navigate("/users/:userId")}
              >
                등록하기
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default UserCertificationEdit;
