import React, { useContext, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import { ForestStateContext } from "../Portfolio";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

// 자격증을 추가할 수 있는 컴포넌트입니다.
const UserCertificationAdd = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [license, setLicense] = useState("");
  const [issuer, setIssuers] = useState("");
  const [issuedDate, setIssueDate] = useState("");
  const [langscore, setLangscore] = useState("0");

  const [isLangScoreChecked, setIsLangScoreChecked] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);
  const fetchPostCertification = async () => {
    const formData = {
      title,
      license,
      issuer,
      issuedDate,
      langscore,
    };

    if (
      title === "" ||
      license === "" ||
      issuer === "" ||
      issuedDate === "" ||
      langscore === ""
    ) {
      alert("자격증 정보를 모두 입력해주세요.");
    } else {
      /**
       * "crtfc" 엔드포인트로 Post 요청합니다.
       */
      isFetchCompleted && setIsFetchCompleted(false);
      const res = await Api.post(`crtfc`, formData);
      if (res.status === 201 || res.status === 200) {
        console.log("자격증이 추가되었습니다.");
        setTitle("");
        setLicense("");
        setIssuers("");
        setIssueDate("");
        refresh();
      }
      setIsEditing(false);
      setIsFetchCompleted(true);
    }
  };

  const handleChecked = (e) => {
    setIsLangScoreChecked(e.target.checked);
  };

  return (
    <>
      <Form>
        {isEditing && (
          <>
            <Row>
              <Form.Label column lg={2}>
                자격증
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={title}
                  placeholder="어떤 자격증인가요?"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Form.Text className="text-success">
                자격증명을 입력하세요
              </Form.Text>
            </Row>
            <br />

            <Row>
              <Form.Label column lg={2}>
                자격증 번호
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={license}
                  placeholder="자격증 번호를 입력해주세요"
                  onChange={(e) => setLicense(e.target.value)}
                />
              </Col>
              <Form.Text className="text-success">
                하이폰(-) 띄어쓰기를 제외하고 입력해주세요
              </Form.Text>
            </Row>
            <br />

            <Row>
              <Form.Label column lg={2}>
                발급 기관
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={issuer}
                  placeholder="발급 받은 기관을 입력해주세요"
                  onChange={(e) => setIssuers(e.target.value)}
                />
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Label column lg={2}>
                발급 날짜
              </Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  className="form-control"
                  value={issuedDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  id={`check-api-"checkbox`}
                  isValid
                  checked={isLangScoreChecked}
                  onChange={handleChecked}
                />
              </Col>
              <Form.Label column lg={2}>
                어학 점수
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="체크박스를 눌러입력해주세요"
                  value={langscore}
                  onChange={(e) => setLangscore(e.target.value)}
                  disabled={!isLangScoreChecked}
                />
              </Col>
              <Form.Text className="text-success">
                숫자만 입력해주세요
              </Form.Text>
            </Row>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button
                  type="button"
                  disabled={false}
                  className="me-3"
                  variant="outline-success"
                  onClick={fetchPostCertification}
                >
                  확인
                </Button>
                <Button
                  className="certification-add-button"
                  type="button"
                  disabled={false}
                  variant="outline-danger"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  취소
                </Button>
              </Col>
            </Form.Group>
          </>
        )}
      </Form>

      {!isEditing && (
        <Col sm={{ span: 20 }}>
          <Button
            type="button"
            disabled={false}
            variant="outline-success"
            className="add-cetification-button"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            자격증 추가하기
          </Button>
        </Col>
      )}
    </>
  );
};

export default UserCertificationAdd;
