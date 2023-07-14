import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import * as Api from "../../api";

//수상내역
const UserAward = ({ award, setAward, setIsEditing}) => {
  
  const [awardData, setAwardData] = useState([]);
  const [awardDate, setAwardDate] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  //수상내역 추가하기ㄴ
  const addAward = () => {
    const award = {
      awardDate: new Date(awardDate),
      organizer: organizer,
      description: description,
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
    setOrganizer('');
    setDescription('');
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
    setOrganizer(award.organizer);
    setDescription(award.description);
    setEditIndex(index);
  };
  
  // 수상일자 입력 여부 확인
  const isAwardDatelValid = (awardDate.length = 8);
  // 주최사 입력 여부 확인
  const isOrganizerValid = organizer.length > 1;
  // 수상내용 입력 여부 확인
  const isDescriptionValid = description.length > 1;


  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`award/${award.id}`, {
      awardData,
      organizer,
      description
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
      <div>
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
                  <br />
              </Form.Group>

              <Form.Group>
                <Form.Label>주최</Form.Label>
                  <input
                    type="text"
                    id="organizer"
                    value={organizer}
                    placeholder="주최사를 입력해주세요"
                    onChange={(e) => setOrganizer(e.target.value)}
                    required
                  />
                  {!isOrganizerValid && (
                    <Form.Text className="text-success">
                      주최사가 입력되지 않았습니다.
                    </Form.Text>
                  )}
                  <br />
              </Form.Group>

              <Form.Group>
                <Form.Label>수상내용</Form.Label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  {!isDescriptionValid && (
                    <Form.Text className="text-success">
                      수상 내용이 입력되지 않았습니다
                    </Form.Text>
                  )}
                  <br />
              </Form.Group>
            
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="primary" type="submit" onClick={addAward}>
                    추가
                  </Button>
                </Col>
              </Form.Group>
                
              <Button ariant="primary" type="submit" onClick={addAward}>
                {editIndex !== -1 ? '수정' : '추가'}
              </Button>
              
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
                        <td>{award.organizer}</td>
                        <td>{award.description}</td>
                        <td>
                          <Button variant="info" onClick={() => editAward(index)}>
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
      </div>
    </Container>
  );
};


export default UserAward;