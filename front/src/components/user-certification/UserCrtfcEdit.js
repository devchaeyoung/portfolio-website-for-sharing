import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";

import Navigate from "../nav/Navigate";
import FormRange from "react-bootstrap/esm/FormRange";

const UserCrtfcEdit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [licence, setLicence] = useState("");
  const [issuers, setIssuers] = useState("");
  const [date, setDate] = useState("");
  const [checkBox, setCheckBox] = useState("");
  const [langscore, setLangscore] = useState("null");

  //조금 더 공부하고 업데이트 예정
  // useEffect((langscore) => {

  // });

  //useEffect로 구현 예정
  const isChecked = langscore === "checked";

  const isTitleValid = title.length > 1;
  /* */
  const isLisenceValid = typeof Number(licence.length) === "number";
  console.log(isLisenceValid);
  //왜 console에 글자를 입력해도 false가 안찍히지?
  const isIssuersValid = issuers.length > 0;
  const isDateValid = date.length === "8";

  const isFormValid = isTitleValid && isIssuersValid && isDateValid;
  //??
  const addLangScore = (e) => {
    let postScore = "";
    if (e.langscore) {
      postScore = langscore === isChecked;
    } else {
      postScore = "";
    }

    postScore = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 임의로 만들어두었습니다. 백엔드 자격증 부분 작업완료 업데이트 예정
    try {
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
                onChange={(e) => setLicence(e.target.value)}
              ></input>
              {!isLisenceValid && (
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
              {/* !!! 체크박스 바꾸는 법을 모르겠어요 */}
              <input
                class="form-check-input"
                type="checkbox"
                className="postScore"
                id="flexCheckDisabled"
              ></input>
              <Form.Text>어학 점수 입력하기</Form.Text>
              {isChecked === true ? (
                <Form.Group>
                  {console.log(checkBox)}
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
                </Form.Group>
              ) : (
                ""
              )}
              <br />
              {/* !!!! */}
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isFormValid}
                  onClick={() => navigate("/users/:userId")}
                >
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

export default UserCrtfcEdit;
