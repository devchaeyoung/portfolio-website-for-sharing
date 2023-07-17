import React, { useState } from "react";
import "./NetworkNavigationBar.style.css";

function Nav({ skills, onClick }) {
  return (
    <nav className="network-navigation">
      {skills.map((skill) => (
        <span
          className="network-nav-item"
          key={skill.id}
          onClick={() => onClick(skill)}
        >
          <a href={skill.link}>{skill.title}</a>
        </span>
      ))}
    </nav>
  );
}
const NetworkNavigataionBar = (props) => {
  const [link, setLink] = useState("");

  const skills = [
    { id: 1, title: "프론트", link: "#front" },
    { id: 2, title: "백", link: "#back" },
    { id: 3, title: "데브옵스", link: "#devops" },
    { id: 4, title: "데이터분석", link: "#data-analysis" },
    { id: 5, title: "Ai", link: "#ai" },
    { id: 6, title: "웹", link: "#web" },
    { id: 7, title: "앱", link: "#app" },
  ];

  const onClickLink = (link) => {
    setLink(link);
  };

  return <Nav skills={skills} onClick={onClickLink} />;
};

export default NetworkNavigataionBar;
