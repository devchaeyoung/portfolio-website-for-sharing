import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Container } from 'react-bootstrap'
import * as Api from "../../api";
// import { DispatchContext } from "../../App";


const ResetPasswordModal = ({ show, onHide }) => {
    const navigate = useNavigate();
    //useState로 email 상태를 생성함.
    const [email, setEmail] = useState("");
    //useState로 password 상태를 생성함.
    const [name, setName] = useState("");
    const validateEmail = (email) => email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );   
    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    const isNameValid = name.length >= 2;
    // 이메일과 아룸 조건이 동시에 만족되는지 확인함.
    const isFormValid = isEmailValid && isNameValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await Api.post("user/reset-password", {
                name,
                email,
            });
                   
            window.alert("메일로 임시 비밀번호를 발송하였습니다.")
            navigate("/login");
        } catch (err) {
            window.alert("일치하는 데이터가 없습니다.\n", err);
            
        }
     };
        
    return(
        <Modal
            show = {show}
            onHide = {onHide}
            size='md'
            aria-labelledby="contained-modal-title-vcenter"
        >
        <Container>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                비밀번호 찾기
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group>
             <Form.Label className="my-3">이름</Form.Label>
            <Form.Control 
                type="text"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해주세요" 
            />
            </Form.Group>

            <Form.Group>
            <Form.Label className="my-3">이메일 주소</Form.Label>
            <Form.Control 
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력해주세요"
            />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
             <Button variant="success" type="button" onClick={handleSubmit}>
                        조회하기
            </Button>{' '}  
            <Button variant="outline-success" type="button" onClick={onHide}>닫기</Button>
        </Modal.Footer>
        </Container>
        </Modal>
    )
}

export default ResetPasswordModal;