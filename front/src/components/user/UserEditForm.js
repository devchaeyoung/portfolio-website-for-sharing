import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import axios from "axios";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const [error, setError] = useState(null);

  const [occupation, setOccupation] = useState();

  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      // "users/유저id" 엔드포인트로 PUT 요청함.
      const res = await Api.put(`user/${user._id}`, {
        name,
        email,
        description,
      });
      // 유저 정보는 response의 data임.
      const updatedUser = res.data;
      // 해당 유저 정보로 user을 세팅함.
      setUser(updatedUser);
      // isEditing을 false로 세팅함.
      setIsEditing(false);
    } catch (e) {
      setError(e);
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    const formData = new FormData();

    formData.append("profileImage", profileImage);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    console.log(formData);
    // "users/유저id" 엔드포인트로 PUT 요청함.\
    const configs = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    };
    const res = await axios.put(
      `http://localhost:5001/user/${user._id}`,
      formData,
      configs
    );

    console.log(res);
    // const res = await Api.put(`user/${user._id}`, formData);
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const handleFileChange = async (e) => {
    setProfileImage(e.target.files[0]);
  };
  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            프로필 업로드
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group controlId="useEditName" className="mb-3">
            이름
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            이메일
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            인사말
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <div key={`inline-radio`} className="mb-3">
            <Form.Check
              inline
              label="프론트"
              name="front"
              type="radio"
              id={`inline-radio-1`}
              on
            />
            <Form.Check
              inline
              label="백엔드"
              name="backEnd"
              type="radio"
              id={`inline-radio-2`}
            />
            <Form.Check
              inline
              label="데브옵스"
              name="devOps"
              type="radio"
              id={`inline-radio-2`}
            />
            <Form.Check
              inline
              label="데이터분석"
              name="data"
              type="radio"
              id={`inline-radio-2`}
            />
            <Form.Check
              inline
              label="AI"
              name="ai"
              type="radio"
              id={`inline-radio-2`}
            />
            <Form.Check
              inline
              label="앱"
              name="app"
              type="radio"
              id={`inline-radio-2`}
            />
          </div>
          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
