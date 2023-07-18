import React from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'

const RegisterModal = ({ show, onHide }) => {
    return(
        <Modal
            show = {show}
            onHide = {onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Container>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                회원가입
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group>
             <Form.Label className="my-3">이메일 주소</Form.Label>
            <Form.Control type="email" placeholder="아이디를 입력해주세요" />
            </Form.Group>

            <Form.Group>
             <Form.Label className="my-3">비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호" />
            </Form.Group>

            <Form.Group>
            <Form.Label className="my-3">이메일 주소</Form.Label>
            <Form.Control type="email" placeholder="이메일 주소를 입력해주세요" />
            </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
             <Button block variant="outline-success" type="button">
                        조회하기
            </Button>{' '}  
            {/* <Button onClick={onHide}>Close</Button> */}
        </Modal.Footer>
        </Container>
        </Modal>
    )
}

export default RegisterModal;