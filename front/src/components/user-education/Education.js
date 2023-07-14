import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("award", portfolioOwnerId).then((res) => {
      setEducations(res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <>
      {/* {educations.map((education) => {
        return (
          <EducationCard
            key={education._id}
            education={education}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          />
        );
      })} */}

      {educations.map((education) =>
        isEditing ? (
          <EducationEditForm
            key={education._id}
            education={education}
            setIsEditing={setIsEditing}
            setEducation={setEducations}
          />
        ) : (
          <EducationCard
            key={education._id}
            education={education}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          />
        )
      )}

      {/* {isEditing ? (
        <EducationEditForm
          userId={portfolioOwnerId}
          education={educations}
          setIsEditing={setIsEditing}
          setEducation={setEducations}
        />
      ) : (
        <EducationCard
          education={educations}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )} */}
    </>
  );
}

export default Education;
