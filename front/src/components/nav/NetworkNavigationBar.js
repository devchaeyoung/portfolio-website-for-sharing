import React, { useState } from "react";
import "./NetworkNavigationBar.style.css";

const devMajor = [
  { id: 1, title: "프론트", link: "#front" },
  { id: 2, title: "백", link: "#back" },
  { id: 3, title: "데브옵스", link: "#devops" },
  { id: 4, title: "데이터분석", link: "#data-analysis" },
  { id: 5, title: "Ai", link: "#ai" },
  { id: 6, title: "웹", link: "#web" },
  { id: 7, title: "앱", link: "#app" },
];

function Nav({ devMajor, onClick }) {
  return (
    <nav className="network-navigation">
      {devMajor.map((devMajor) => (
        <span
          className="network-nav-item"
          key={devMajor.id}
          onClick={() => onClick(devMajor)}
        >
          <a className="network-link" href={devMajor.link}>
            {devMajor.title}
          </a>
        </span>
      ))}
    </nav>
  );
}

const NetworkNavigationBar = (props) => {
  const [, setLink] = useState("");

  const onClickLink = (link) => {
    setLink(link);
  };

  return <Nav devMajor={devMajor} onClick={onClickLink} />;
};

export default NetworkNavigationBar;
