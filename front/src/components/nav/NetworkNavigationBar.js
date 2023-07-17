import React, { useState } from "react";
import "./NetworkNavigationBar.style.css";

function Nav({ devMajor, onClick }) {
  return (
    <nav className="network-navigation">
      {devMajor.map((skill) => (
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
const devMajor = [
  { id: 1, title: "프론트", link: "#front" },
  { id: 2, title: "백", link: "#back" },
  { id: 3, title: "데브옵스", link: "#devops" },
  { id: 4, title: "데이터분석", link: "#data-analysis" },
  { id: 5, title: "Ai", link: "#ai" },
  { id: 6, title: "웹", link: "#web" },
  { id: 7, title: "앱", link: "#app" },
];

const NetworkNavigataionBar = (props) => {
  const [link, setLink] = useState("");

  //Link가 변경될때마다 밑에가 계속 그려진다.

  const onClickLink = (link) => {
    setLink(link);
  };

  return <Nav devMajor={devMajor} onClick={onClickLink} />;
};

export default NetworkNavigataionBar;
