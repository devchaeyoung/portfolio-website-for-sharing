import React, { useContext, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "./UserCertificationCard.style.css";
import * as Api from "../../api";
import { dateFormat } from "../../lib/dateFormatter";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

const CERTIFICATION_INFO = [
  { title: "자격증", key: "title" },
  { title: "자격증 번호", key: "license" },
  { title: "발급기관", key: "issuer" },
  { title: "발급일", key: "issuedDate" },
  { title: "점수", key: "langscore" },
];

function UserCertificationCard({
  certification,
  setCertifications,
  isEditable,
  refresh,
}) {
  const [title, setTitle] = useState(certification.title);
  const [license, setLicense] = useState(certification.license);
  const [issuer, setIssuer] = useState(certification.issuer);
  const [issuedDate, setIssuedDate] = useState(certification.issuedDate);
  const [langscore, setLangscore] = useState(certification.langscore);
  const [isEditing, setIsEditing] = useState(false);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const handleSubmit = async () => {
    // "crtfc/:crtfcid" 엔드포인트로 PUT 요청함.
    await Api.put(`crtfc/${certification._id}`, {
      title,
      license,
      issuer,
      issuedDate,
      langscore,
    });
    refresh();
    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const onClickEditingButton = () => {
    if (isEditing) handleSubmit();
    setIsEditing((previous) => {
      return !previous;
    });
  };

  const onClickDeleteButton = async () => {
    isFetchCompleted && setIsFetchCompleted(false);
    await Api.delete(`crtfc/${certification._id}`);
    refresh();
    setIsFetchCompleted(true);
  };

  return (
    <div className="certification-card-edit">
      {isEditing ? (
        <Form className="certification-card-edit-inline">
          <Row>
            <Form.Label column lg={2}>
              자격증
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
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
                onChange={(e) => setLicense(e.target.value)}
              />
            </Col>
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
                onChange={(e) => setIssuer(e.target.value)}
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
                value={dateFormat(new Date(issuedDate))}
                onChange={(e) => setIssuedDate(e.target.value)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Check type="checkbox" id={`check-api-"checkbox`} sm={1} />
            </Col>
            <Form.Label column lg={2}>
              어학 점수
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                className="form-control"
                value={langscore}
                onChange={(e) => setLangscore(e.target.value)}
              />
            </Col>
          </Row>
          <br />
        </Form>
      ) : (
        <div>
          <Form className="certification-card">
            {isEditable && (
              <Button
                className="certification-delete-button"
                variant="outline-success"
                onClick={onClickDeleteButton}
              >
                X
              </Button>
            )}

            <Row className="user-portfolio-item">
              <Col lg={5}>자격증</Col>
              <Col>{title}</Col>
            </Row>

            <Row className="user-portfolio-item">
              <Col lg={5}>자격증 번호</Col>
              <Col>{license}</Col>
            </Row>
            <Row className="user-portfolio-item">
              <Col lg={5}>발급 기관</Col>
              <Col>{issuer}</Col>
            </Row>

            <Row className="user-portfolio-item">
              <Col lg={5}>발급일</Col>
              <Col>{issuedDate && dateFormat(new Date(issuedDate))}</Col>
            </Row>

            {langscore !== 0 && (
              <Row className="user-portfolio-item">
                <Col lg={5}>점수</Col>
                <Col>{langscore}</Col>
              </Row>
            )}
          </Form>
        </div>
      )}

      {isEditable && (
        <Button
          variant="outline-success"
          type="submit"
          onClick={onClickEditingButton}
          className="certification-button"
        >
          {isEditing ? "수정완료" : "수정하기"}
        </Button>
      )}
    </div>
  );
}

export default UserCertificationCard;
