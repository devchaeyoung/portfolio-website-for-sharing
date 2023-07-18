import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import axios from "axios";

const OCCUPATIONINFO = [
  { label: "프론트", name: "front" },
  { label: "백엔드", name: "backend" },
  { label: "데브옵스", name: "devOps" },
  { label: "데이터분석", name: "data" },
  { label: "AI", name: "ai" },
  { label: "앱", name: "app" },
];
function UserEditForm({ user, setIsEditing, setUser }) {
  const [profileImage, setProfileImage] = useState(null);
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const [error, setError] = useState(null);

  const [checkedlist, setCheckedList] = useState([]);

  const handleCheckboxClick = (e) => {
    const name = e.target.name;
    const checkedState = e.target.checked;
    if (checkedState) {
      const newList = [...checkedlist, name];
      setCheckedList(newList);
    } else if (!checkedState) {
      const newList = checkedlist.filter((item) => item !== name);
      setCheckedList(newList);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(null);

      const formData = new FormData();

      formData.append("profileImage", profileImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("description", description);
      console.log(formData);
      const configs = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      };
      // "users/유저id" 엔드포인트로 PUT 요청함.
      const res = await Api.put(`user/${user._id}`, {
        formData,
        configs,
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
  };

  const handleFileChange = async (e) => {
    setProfileImage(e.target.files[0]);
  };
  console.log("직종", checkedlist);
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
          <div key={`inline-checkbox`} className="mb-3">
            {OCCUPATIONINFO.map((item) => {
              return (
                <Form.Check
                  inline
                  label={item.label}
                  name={item.name}
                  type="checkbox"
                  id={`inline-checkbox-1`}
                  onClick={handleCheckboxClick}
                />
              );
            })}
          </div>
          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="success"
                size="sm"
                type="submit"
                className="me-3"
              >
                확인
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
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
