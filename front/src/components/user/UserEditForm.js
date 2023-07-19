import React, { useState, useEffect } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const OCCUPATIONINFO = [
  { label: "프론트", name: "front" },
  { label: "백엔드", name: "backend" },
  { label: "데브옵스", name: "devOps" },
  { label: "데이터분석", name: "data" },
  { label: "AI", name: "ai" },
  { label: "앱", name: "app" },
];
function UserEditForm({ user, setIsEditing, setUser }) {
  const [profileImageFile, setProfileImageFile] = useState(null);

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

      formData.append("profileImage", profileImageFile);

      // "users/유저id" 엔드포인트로 PUT 요청함.
      const res = await Api.putMulter(`user/uploadImage`, formData);

      console.log("----------유저 프로필 사진 변경---------");
      console.log(res);
      console.log("----------유저 프로필 사진 변경---------");
    } catch (e) {
      setError(e);
    }

    if (error) {
      return <div>{error.message}</div>;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    try {
      if (file) {
        console.log(file);
        fileReader.onload = (e) => {
          setProfileImageFile(e.target.result);
        };
        fileReader.readAsDataURL(file);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("--------프로필 이미지 변경--------");
    console.log(profileImageFile);
    console.log("------------------------------");
  }, [profileImageFile]);
  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {profileImageFile && (
            <img src={profileImageFile} alt="변경할 이미지" />
          )}
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
