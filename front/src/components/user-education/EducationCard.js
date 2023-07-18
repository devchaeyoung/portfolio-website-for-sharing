import React, { useState } from "react";
import EducationCardForm from "./EducationCardForm";
import EducationEditForm from "./EducationEditForm";

const EducationCard = ({
  education,
  isEditable,
  editEducation,
  deleteEducation,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          setIsEditing={setIsEditing}
          editEducation={editEducation}
        />
      ) : (
        <EducationCardForm
          education={education}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          deleteEducation={deleteEducation}
        />
      )}
    </>
  );
};

export default EducationCard;
