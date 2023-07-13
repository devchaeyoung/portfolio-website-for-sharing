import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";

import Navigate from "../nav/Navigate";

const UserCertifictionEdit = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [licence, setLicence] = useState("");
  const [issuers, setIssuers] = useState("");
  const [date, setDate] = useState("");
  const [checkBox, setCheckBox] = useState("");

  // 언어 점수 체크박스로 나타나게 만들 예정
  const [langscore, setLangscore] = useState();

  const isChecked = checkBox.value === "checked";
  const isTitleValid = title.length > 1;
  const isIssuersValid = issuers.length > 0;
  const isDateValid = (date.length = 8);

  const isFormValid = isTitleValid && isIssuersValid && isDateValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 임의로 만들어두었습니다. 백엔드 자격증 부분 작업완료 업데이트 예정
    try {
      // 엔드포인트 /crtfc/:id/edit
      await Api.post("/crtfc/:id/edit", {
        title,
        licence,
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
            <Form.Group>
              <Form.Label>자격증</Form.Label>
              <input
                type="text"
                class="form-control"
                value={title}
                placeholder="어떤 자격증인가요?"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              {!isTitleValid && (
                <Form.Text className="text-success">
                  자격증명을 입력하세요
                </Form.Text>
              )}
              <br />
              <Form.Label>자격증 번호</Form.Label>
              <input
                type="text"
                class="form-control"
                value={licence}
                placeholder="자격증 번호를 입력해주세요"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              {!isTitleValid && (
                <Form.Text className="text-success">
                  하이폰(-) 띄어쓰기를 제외하고 입력해주세요
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
                placeholder="어학자격증을 경우 위 체크박스를 눌러 입력해주세요"
                onChange={(e) => setLangscore(e.target.value)}
                disabled={!isChecked}
              ></input>
              <Form.Text className="text-success">
                숫자만 입력해주세요
              </Form.Text>
              <br />
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              {/* 체크박스 바꾸는 법을 모르겠어요 */}
              <input
                class="form-check-input"
                type="checkbox"
                value={checkBox}
                id="flexCheckDisabled"
              ></input>

              {/* <Form.Check.input></Form.Check.input>

  <label class="form-check-label" for="flexCheckDisabled">
    Disabled checkbox
  </label> */}

              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  등록하기
                </Button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserCertifictionEdit;
