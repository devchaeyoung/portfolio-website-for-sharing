import React, { useState } from "react";
import EducationCardForm from "./EducationCardForm";
import EducationEditForm from "./EducationEditForm";

const EducationCard = ({ education, isEditable, setEducations }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          setIsEditing={setIsEditing}
          setEducations={setEducations}
        />
      ) : (
        <EducationCardForm
          education={education}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          setEducations={setEducations}
        />
      )}
    </>
  );
};

export default EducationCard;
