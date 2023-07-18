import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

function UserNetworkCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const userId = user._id;
  return (
    <Card
      className="mt-5 mb-5 ms-5 mr-5 card border-light mb-3 shadow p-3 mb-5 bg-body-tertiary rounded"
      style={{ width: "20rem" }}
    >
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "20rem" }}
            className="mb-3"
            src="http://placekitten.com/200/200"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/user/${userId}`)}
          >
            {user?.name}님 숲 구경가기
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserNetworkCard;
