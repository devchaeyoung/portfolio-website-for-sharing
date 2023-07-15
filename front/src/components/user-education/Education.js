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
    Api.get("education", portfolioOwnerId).then((res) => {
      setEducation(res.data[0]);
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
