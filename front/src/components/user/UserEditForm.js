import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { DispatchContext } from "../../App";

const STACKLIST = [
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
  //user.stacks 가져와야함
  const [stacks, setStacks] = useState(user?.stacks);
  const [error, setError] = useState(null);

  const dispatch = useContext(DispatchContext);

  const handleCheckboxClick = (e) => {
    const name = e.target.name;
    const checkedState = e.target.checked;
    if (checkedState) {
      const newList = [...stacks, name];
      console.log(newList);
      setStacks(newList);
    } else if (!checkedState) {
      const newList = stacks.filter((item) => item !== name);
      setStacks(newList);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      //유저 편집
      await Api.put(`user/${user._id}`, {
        name,
        email,
        description,
        stacks,
      });

      // 유저 정보는 response의 data임.
      const response = await Api.get(`user/${user._id}`);
      const newData = response.data;
      setUser(newData);
      // 해당 유저 정보로 user을 세팅함.
      setIsEditing(false);

      const formData = new FormData();

      const uploadFile = profileImageFile
        ? profileImageFile
        : user.profileImage;

      formData.append("profileImage", uploadFile);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("description", description);

      stacks.forEach((stack) => {
        formData.append("stacks", stack);
      });

      // // "users/유저id" 엔드포인트로 PUT 요청함.
      const res = await Api.putMulter(`user/${user._id}`, formData);

      if (res.status === 201) {
        setUser(res.data);
        dispatch({ type: "UPDATE", payload: res.data });
      }
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
          <img
            src={profileImageFile ? profileImageFile : user.profileImage}
            style={{ width: "18rem" }}
            alt="변경할 이미지"
          />
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
          {/* 스택 리스트 */}
          <div key={`inline-checkbox-$`} className="mb-3">
            {STACKLIST.map((item) => {
              return (
                <Form.Check
                  key={item.name}
                  inline
                  label={item.label}
                  name={item.name}
                  type="checkbox"
                  id={`inline-checkbox-${item.name}`}
                  checked={stacks.includes(item.name)}
                  onChange={handleCheckboxClick}
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
                onClick={(e) => {
                  handleSubmit(e);
                  setIsEditing(false);
                }}
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
