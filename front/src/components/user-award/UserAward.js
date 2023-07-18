import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import * as Api from "../../api";

//수상내역
const UserAward = ({ award, setAward, setIsEditing }) => {
  
  const [awardData, setAwardData] = useState([]);
  const [awardDate, setAwardDate] = useState('');
  const [issuer, setIssuer] = useState('');
  const [title, setTitle] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  //수상내역 추가하기ㄴ
  const addAward = () => {
    const award = {
      awardDate: new Date(awardDate),
      issuer: issuer,
      title: title,
    };

    if (editIndex !== -1) {
      const updatedData = [...awardData];
      updatedData[editIndex] = award;
      setAwardData(updatedData);
      setEditIndex(-1);
    } else {
      setAwardData([...awardData, award]);
    }

    setAwardDate('');
    setIssuer('');
    setTitle('');
  };

  // 수상내역 삭제
  const deleteAward = (index) => {
    const updatedData = [...awardData];
    updatedData.splice(index, 1);
    setAwardData(updatedData);
  };

  // 수정 시 선택한 데이터 입력 채워주는 함수
  const editAward = (index) => {
    const award = awardData[index];
    setAwardDate(award.awardDate.toISOString().split('T')[0]);
    setIssuer(award.issuer);
    setTitle(award.title);
    setEditIndex(index);
  };
  
  // 수상일자 입력 여부 확인
  const isAwardDatelValid = typeof Number(awardDate.length) === "number";
  // 주최사 입력 여부 확인
  const isOrganizerValid = issuer.length > 1;
  // 수상내용 입력 여부 확인
  const isDescriptionValid = title.length > 1;


  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`award/${award.id}`, {
      awardData,
      issuer,
      title
    });
    // 유저 정보는 response의 data임.
    const updateAward = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setAward(updateAward);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };


  return (
    <Container>
        <h1>수상내역 관리</h1>
          <Row className="justify-content-md-center mt-5">
            <Col lg={8}>
              <Form.Group>
                <Form.Label>수상 일자</Form.Label>
                  <input
                    type="date"
                    id="awardDate"
                    value={awardDate}
                    placeholder="yyyy.mm.dd"
                    onChange={(e) => setAwardDate(e.target.value)}
                    required
                  />
                  {!isAwardDatelValid && (
                    <Form.Text className="text-success">
                      수상 일자가 입력되지 않았습니다.
                    </Form.Text>
                  )}
              </Form.Group>

              <Form.Group>
                <Form.Label>주최</Form.Label>
                  <input
                    type="text"
                    id="issuer"
                    value={issuer}
                    placeholder="주최사를 입력해주세요"
                    onChange={(e) => setIssuer(e.target.value)}
                    required
                  />
                  {!isOrganizerValid && (
                    <Form.Text className="text-success">
                      주최사가 입력되지 않았습니다.
                    </Form.Text>
                  )}
              </Form.Group>

              <Form.Group>
                <Form.Label>수상내용</Form.Label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  {!isDescriptionValid && (
                    <Form.Text className="text-success">
                      수상 내용이 입력되지 않았습니다
                    </Form.Text>
                  )}

              </Form.Group>


              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="primary" type="submit" onClick={addAward}>
                  {editIndex !== -1 ? '완료' : '추가'}
                  </Button>
                </Col>
              </Form.Group>
            
            
              {awardData.length === 0 ? (
                <p>수상내역이 없습니다.</p>
              ) : (
                <Table striped="columns">
                  <thead>
                    <tr>
                      <th>수상일자</th>
                      <th>주최</th>
                      <th>수상내용</th>
                      <th>수정</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {awardData.map((award, index) => (
                      <tr key={index}>
                        <td>
                          {award.awardDate.getFullYear()}.
                          {award.awardDate.getMonth() + 1}.
                          {award.awardDate.getDate()}
                        </td>
                        <td>{award.issuer}</td>
                        <td>{award.title}</td>
                        <td>
                          <Button variant="primary" onClick={() => editAward(index)}>
                            수정
                          </Button>
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => deleteAward(index)}>
                            삭제
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>     
              )};
            </Col>
          </Row>
    </Container>
  );
};


export default UserAward;