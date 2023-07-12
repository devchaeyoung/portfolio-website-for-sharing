import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const UserSkillEdit = () => {
  const skillList = [
    "Java",
    "JavaScript",
    "Spring",
    "HTML/CSS",
    "jQuery",
    "JSP",
    "Vue.js",
    "Oracle",
    "MySQL",
    "React",
    "Spring Boot",
    "PHP",
    "Python",
    "Node.js",
    "C#",
    "Swift",
    "Kotlin",
    "MySQL",
    "React Native",
    "전자정부 프레임워크",
  ];

  const [search, setSearch] = useState("스킬을 검색해주세요");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          aria-label="Search"
          value={search}
          onChange={handleChange}
        ></input>
      </form>
      <div className="skill-tag-list">
        {skillList.map((skill) => (
          <span className="skilll-tag" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserSkillEdit;
