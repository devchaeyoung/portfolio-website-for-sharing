import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ScrollToTop() {
  const goTop = () => {
    window.scrollTo(0, 0);
  };

  return <Button onClick={goTop}>스크롤</Button>;
}
