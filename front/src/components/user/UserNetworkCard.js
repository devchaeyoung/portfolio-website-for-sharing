import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import "./style/networkCard.style.css";

function UserNetworkCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const userId = user._id;
  return (
    <div className="user-network-card">
      <Row className="justify-content-md-center mb-3">
        <Card.Img
          style={{ width: "20rem" }}
          className="userCard"
          src={
            user?.profileImage
              ? user.profileImage
              : "http://placekitten.com/200/200"
          }
          alt="profile"
        />
      </Row>
      <h3>{user?.name}</h3>
      <p className="mb-2 text-muted">{user?.email}</p>
      <p>{user?.description}</p>

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
        <span className="user-link" onClick={() => navigate(`/user/${userId}`)}>
          {user?.name}님 숲 구경가기🌿
        </span>
      )}
    </div>
  );
}

export default UserNetworkCard;
