import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

//input search 넣기
const UserSkillStack = () => {
  return (
    <div>
      <div className="skill-tag-list"></div>
      <input type="search"></input>
      <p className="skill-tag">Java</p>
      <p className="skill-tag">JavaScript</p>
      <p className="skill-tag">Spring</p>
      <p className="skill-tag">HTML/CSS</p>
      <p className="skill-tag">jQuery</p>
      <p className="skill-tag">JSP</p>
      <p className="skill-tag">Vue.js</p>
      <p className="skill-tag">Oracle</p>
      <p className="skill-tag">MySQL</p>
      <p className="skill-tag">React</p>
      <p className="skill-tag">Spring Boot</p>
      <p className="skill-tag">PHP</p>
      <p className="skill-tag">Python</p>
      <p className="skill-tag">Node.js</p>
      <p className="skill-tag">C#</p>
      <p className="skill-tag">swift</p>
      <p className="skill-tag">Kotlin</p>
      <p className="skill-tag">MSSQL</p>
      <p className="skill-tag">React Native</p>
      <p className="skill-tag">전자정부 프레임워크</p>
    </div>
  );
};

export default UserSkillStack;
