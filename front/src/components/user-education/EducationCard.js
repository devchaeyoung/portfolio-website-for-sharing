import React, { useState } from "react";
import EducationCardForm from "./EducationCardForm";
import EducationEditForm from "./EducationEditForm";

const EducationCard = ({ education, isEditable, getEducation }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          setIsEditing={setIsEditing}
          getEducation={getEducation}
        />
      ) : (
        <EducationCardForm
          education={education}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          getEducation={getEducation}
        />
      )}
    </>
  );
};

export default EducationCard;
