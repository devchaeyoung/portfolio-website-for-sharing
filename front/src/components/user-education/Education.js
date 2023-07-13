import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEdit";

function Education({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => {
      console.log(res.data);
      setUserId(res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          userId={userId}
          setIsEditing={setIsEditing}
          setUserId={setUserId}
        />
      ) : (
        <EducationCard
          userId={userId}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Education;
