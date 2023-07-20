import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const userId = user?._id;

  return (
    <Card>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "20rem" }}
            className="mb-3"
            src={
              user?.profileImage
                ? user.profileImage
                : "http://placekitten.com/200/200"
            }
            alt="profile"
          />
        </Row>
        <Card.Text>{user?.description}</Card.Text>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-success"
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
            {/* const userId = user._id 로 변경하면 서버에서 _id를 찾지못하는 오류생김 */}
            {user?.name}님 숲 구경가기
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
