import { Button } from "react-bootstrap";
import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const goTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Button className="scroll-to-top-button" onClick={goTop}>
      UP
    </Button>
  );
}
