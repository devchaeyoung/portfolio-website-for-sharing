import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import { DispatchContext } from "../../App";

//클릭 시 직종별 포트폴리오를 볼 수 있는 컴포넌트입니다.
const WelcomeForest = () => {


  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
        <Form>
          <Form.Label>모여봐요</Form.Label><br />
          <Form.Label>취업의 숲</Form.Label>

          
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit">
                  둘러보기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default WelcomeForest;
