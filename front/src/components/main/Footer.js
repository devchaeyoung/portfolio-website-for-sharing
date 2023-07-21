import React from "react";
import "./footer.style.css";

const Footer = () => {
  return (
    <footer className="footer-container-box">
      <nav className="footer-item">
        <a
          href="https://aitrack.elice.io/explore"
          className="footer-link"
          target="_blank"
          rel="noreferrer"
        >
          Elice Ai8기
        </a>{" "}
        |
        <a
          href="https://kdt-gitlab.elice.io/ai_track/class_08/web_project/team01/teamproject/-/tree/master"
          className="footer-link"
          target="_blank"
          rel="noreferrer"
        >
          Gitlab
        </a>
      </nav>
      <p className="footer-description">
        <span>1팀 | 이창근 이혜빈 최은진 조대찬 진채영</span>
        <br />
        <span>Copyright 2023. Elice 점심은 뭐예요?. All Rights Reserved.</span>
      </p>
    </footer>
  );
};

export default Footer;
