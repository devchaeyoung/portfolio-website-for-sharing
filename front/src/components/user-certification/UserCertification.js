import React, { useState, useEffect } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import UserCertificationCard from "./UserCertificationCard";

const mockup = [
  {
    id: 1,
    title: "AWS 자격증",
    license: 12341234,
    issuedDate: 2020 - 12 - 12,
    issuer: "창원 교육청",
    langscore: 78,
    author: "진채영",
  },
  {
    id: 2,
    title: "헬스자격증",
    license: 12341234,
    issuedDate: 2020 - 12 - 12,
    issuer: "창원 헬스장",
    langscore: 78,
    author: "진채영",
  },
];
function UserCertification({ portfolioOwnerId, isEditable }) {
  const [certifications, setCetifications] = useState([]);

  const fetchCertifications = async () => {
    // 개인 자격증 리스트를 받아오는 API 함수.
    const res = await Api.get("crtfc", portfolioOwnerId);
    console.log("이 밑에 있는 데이터 확인해봐봐");
    console.log(res);
    setCetifications(mockup);
  };

  const updateCeltification = (id, data) => {
    const newState = certifications.map((certification) =>
      certification.id === id ? { ...data } : certification
    );
  };

  useEffect(() => [fetchCertifications()], []);

  return (
    <div>
      {certifications.map((certification) => (
        <UserCertificationCard
          key={certification.id}
          certification={certification}
          isEditable={isEditable}
          onUpdate={updateCeltification}
        />
      ))}
    </div>
  );
}

export default UserCertification;
