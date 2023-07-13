import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserCertifictionEdit = () => {
  const [credentials, setCredentials] = useState("자격증을 추가해주세요");
  const [issuers, setIssuers] = useState("");
  const [date, setDate] = useState();
  const [language, setLanguage] = useState();

  return (
    <div>
      <div>
        <h3>자격증</h3>
        <input type="text" value={credentials}></input>
        <h3>발급 기관</h3>
        <input type="text" value={issuers} />
        <h3>발급 날짜</h3>
        <input type="date" value={date}></input>
      </div>
    </div>
  );
};

export default UserCertifictionEdit;
