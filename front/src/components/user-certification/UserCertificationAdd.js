import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";

// 자격증을 추가할 수 있는 컴포넌트입니다.
const UserCertificationAdd = ({ addCertification }) => {
  const [title, setTitle] = useState("목업데이터1");
  const [license, setLicense] = useState("123499191");
  const [issuer, setIssuers] = useState("대한교육");
  const [issuedDate, setIssueDate] = useState("2020-12-12");
  const [langscore, setLangscore] = useState("100");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      license,
      issuer,
      issuedDate,
      langscore,
    };

    /**
     * "crtfc" 엔드포인트로 Post 요청합니다.
     */
    const res = await Api.post(`crtfc`, formData);
    if (res.status === 201 || res.status === 200) {
      alert("자격증이 추가되었습니다.");
      addCertification(res.data);
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col lg={2}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>자격증</Form.Label>
            <input
              type="text"
              className="form-control"
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
              className="form-control"
              value={license}
              placeholder="자격증 번호를 입력해주세요"
              onChange={(e) => setLicense(e.target.value)}
            ></input>
            <Form.Text className="text-success">
              하이폰(-) 띄어쓰기를 제외하고 입력해주세요
            </Form.Text>
            <br />
            <Form.Label>발급 기관</Form.Label>
            <input
              type="text"
              className="form-control"
              value={issuer}
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
              className="form-control"
              value={issuedDate}
              placeholder="1999-01-01"
              onChange={(e) => setIssueDate(e.target.value)}
            ></input>
            <Form.Text className="text-success">
              날짜는 양식에 맞춰 입력해주세요
            </Form.Text>
            <br />

            <input
              className="form-check-input postScore"
              type="checkbox"
              id="flexCheckDisabled"
            ></input>
            <Form.Text>어학 점수 입력하기</Form.Text>
            <Form.Group>
              <Form.Label>어학 점수</Form.Label>
              <input
                type="text"
                className="form-control"
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
                onClick={handleSubmit}
              >
                자격증 추가하기
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default UserCertificationAdd;
