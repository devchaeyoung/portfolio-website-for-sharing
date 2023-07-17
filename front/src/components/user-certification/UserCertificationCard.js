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

    deleteCertification(certification._id);
  };

  return (
    <div className="certification-card-edit">
      {isEditing ? (
        <div className="certification-edit">
          <Row className="justify-content-md-center mt-5">
            <Col lg={10}>
              <Form>
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
                    onChange={(e) => setIssuer(e.target.value)}
                  ></input>
                  <Form.Text className="text-success">
                    발급 기관을 입력해주세요
                  </Form.Text>
                  <br />
                  <Form.Label>발급 날짜</Form.Label>
                  <input
                    type="date"
                    className="form-control"
                    value={dateFormat(new Date(issuedDate))}
                    placeholder="1999-01-01"
                    onChange={(e) => setIssuedDate(e.target.value)}
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
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
      ) : (
        <Card
          className="mb-5 ms-5 mr-6 certification-item"
          style={{ width: "20rem" }}
        >
          {isEditable && (
            <Button
              className="certification-delete-button"
              variant="outline-success"
              onClick={onClickDeleteButton}
            >
              X
            </Button>
          )}
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Row>
              <Col>자격증 발급 번호: {license}</Col>
            </Row>
            <Row>
              <Col>발급처: {issuer}</Col>
            </Row>
            <Row>
              <Col>
                발급일: {issuedDate && dateFormat(new Date(issuedDate))}
              </Col>
            </Row>
            <Row>
              <Col>점수: {langscore}</Col>
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
