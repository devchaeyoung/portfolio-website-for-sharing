import React, { useState } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import "./UserCertificationCard.style.css";
import * as Api from "../../api";
import { dateFormat } from "../../lib/dateFormatter";

function UserCertificationCard({
  certification,
  setCertification,
  isEditable,
  updateCertification,
  deleteCertification,
}) {
  const [title, setTitle] = useState(certification.title);
  const [license, setLicense] = useState(certification.license);
  const [issuer, setIssuer] = useState(certification.issuer);
  const [issuedDate, setIssuedDate] = useState(certification.issuedDate);
  const [langscore, setLangscore] = useState(certification.langscore);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async () => {
    // "crtfc/:crtfcid" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`crtfc/${certification._id}`, {
      title,
      license,
      issuer,
      issuedDate,
      langscore,
    });

    // 유저 정보는 response의 data임.
    const data = res.data;
    // 해당 유저 정보로 user을 세팅함.
    updateCertification(data);

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
    const res = await Api.delete(`crtfc/${certification._id}`);
    // certification 삭제 API 구현 후 console 제거 예정입니다.
    console.log("----------자격증 삭제---------");
    console.log(res);
    console.log("----------자격증 삭제---------");

    // deleteCertification(certification._id);
    setCertification(res.data);
  };

  return (
    <div className="certification-card-edit">
      {isEditing ? (
        <div className="certification-edit">
          <Card border="success" style={{ width: "40rem" }}>
            <Card.Header>자격증 편집하기</Card.Header>
            <Card.Body>
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
                  <Form.Check type="radio" id={`check-api-"radio`} sm={1}>
                    <Form.Check.Input type="radio" isValid />
                  </Form.Check>
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
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Card border="success" style={{ width: "40rem", height: "60rem" }}>
          {isEditable && (
            <Button
              className="certification-delete-button"
              variant="outline-success"
              onClick={onClickDeleteButton}
            >
              X
            </Button>
          )}

          <Card.Header>{title}</Card.Header>
          <Card.Body>
            <Row>
              <Col column lg={2}>
                자격증 번호
              </Col>
              <Col>{license}</Col>
            </Row>
            <Row>
              <Col column lg={2}>
                발급 기관
              </Col>
              <Col>{issuer}</Col>
            </Row>
            <Row>
              <Col column lg={2}>
                발급일
              </Col>
              <Col>{issuedDate && dateFormat(new Date(issuedDate))}</Col>
            </Row>

            <Row>
              <Col column lg={2}>
                점수
              </Col>
              <Col>{langscore}</Col>
            </Row>
          </Card.Body>

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
        </Card>
      )}
    </div>
  );
}

export default UserCertificationCard;
