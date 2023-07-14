import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
import { Button } from "react-bootstrap";

function Education({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [education, setEducation] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("education", "portfolioOwnerId").then((res) => {
      setEducation(res.data);
      console.log(res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <>
      {/* 변경해야함 isEditing 아니고 isEditable 써서 button추가 해줘야함. */}

      {isEditing ? (
        education.length === 0 ? (
          <Button>학력 추가 </Button>
        ) : (
          <EducationEditForm
            education={education}
            setIsEditing={setIsEditing}
            setEducation={setEducation}
          />
        )
      ) : (
        <EducationCard
          education={education}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}

      {/* 
      {isEditing ? (
        <EducationEditForm
          education={education}
          setIsEditing={setIsEditing}
          setEducation={setEducation}
        />
      ) : (
        <EducationCard
          education={education}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )} */}
    </>
  );
}

export default Education;
