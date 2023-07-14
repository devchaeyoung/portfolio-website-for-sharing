import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
import * as Api from "../../api";

const UserWorkExperience = () => {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState("");
  const [experiences, setExperiences] = useState([]);

  const addExperience = () => {
    if (company === "" || startDate === "" || endDate === "" || role === "") {
      alert("입력되지 않은 항목이 있습니다.");
      return;
    }

    const newExperience = {
      company,
      startDate,
      endDate,
      role,
    };

    setExperiences([...experiences, newExperience]);
    setCompany("");
    setStartDate("");
    setEndDate("");
    setRole("");
  };

  return (
    <Container>
      <div>
        <h1>경력 관리</h1>
        <Row className="justify-content-md-center mt-5">
          <Col lg={8}>
            <Form.Group>
              <Form.Label>회사명</Form.Label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>입사</Form.Label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>퇴사</Form.Label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>담당 없무</Form.Label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                {/* 일단 오류안나게 바꿔두었습니다! */}
                {/* <Button variant="primary" type="submit" disabled={!isFormValid}> */}
                <Button variant="primary" type="submit">
                  추가
                </Button>
              </Col>
            </Form.Group>
            <Table striped="columns">
              <thead>
                <tr>
                  <th>회사명</th>
                  <th>입사일</th>
                  <th>퇴사일</th>
                  <th>담당 업무</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((experience, index) => (
                  <tr key={index}>
                    <td>{experience.company}</td>
                    <td>{experience.startDate}</td>
                    <td>{experience.endDate}</td>
                    <td>{experience.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default UserWorkExperience;
