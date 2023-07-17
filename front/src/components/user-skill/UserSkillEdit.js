import React, { useState } from "react";
import {} from "react-bootstrap";
import "./userSkill.style.css";

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

const UserSkillEdit = () => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          aria-label="Search"
          value={search}
          onChange={handleChange}
        ></input>
      </form>
      {/* 태그 넣을 예정 */}
      <div className="skill-tag-list">
        {skillList.map((skill) => (
          <span className="label label-success" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserSkillEdit;
