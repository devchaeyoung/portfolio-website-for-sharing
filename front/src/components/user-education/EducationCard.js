import React, { useState } from "react";
import EducationCardForm from "./EducationCardForm";
import EducationEditForm from "./EducationEditForm";

const EducationCard = ({ education, isEditable, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          setIsEditing={setIsEditing}
          onEdit={onEdit}
        />
      ) : (
        <EducationCardForm
          education={education}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
};

export default EducationCard;
