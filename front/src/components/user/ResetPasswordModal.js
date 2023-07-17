import React from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'

const ResetPasswordModal = ({ show, onHide }) => {
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
                비밀번호 찾기
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group>
             <Form.Label className="my-3">Id</Form.Label>
            <Form.Control type="email" placeholder="아이디를 입력해주세요" />
            </Form.Group>

            <Form.Group>
             <Form.Label className="my-3">Name</Form.Label>
            <Form.Control placeholder="이름을 입력해주세요" />
            </Form.Group>

            <Form.Group>
            <Form.Label className="my-3">Email</Form.Label>
            <Form.Control type="email" placeholder="이메일을 입력해주세요" />
            </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
             <Button block variant="outline-success" type="button">
                        비밀번호 찾기
            </Button>{' '}  
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
        </Container>
        </Modal>
    )
}

export default ResetPasswordModal;