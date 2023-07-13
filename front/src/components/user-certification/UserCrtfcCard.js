import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

//과제제출
function UserCrtfcCard({ user }) {
  const navigate = useNavigate();
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>국제표준 컴퓨터활용능력 ICDL</Card.Text>
        <Card.Title>한국생산성본부(KPC)</Card.Title>
        <Card.Title>2023.05.01.</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default UserCrtfcCard;
