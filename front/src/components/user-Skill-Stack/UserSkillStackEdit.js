import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const UserStackEdit = (e) => {
  e.preventDefault();

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

  return (
    <div>
      <input type="text"></input>
      <div className="skill-tag-list">
        {skillList.map((skill) => (
          <p className="skilll-tag" key={skill}>
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
};

export default UserStackEdit;
