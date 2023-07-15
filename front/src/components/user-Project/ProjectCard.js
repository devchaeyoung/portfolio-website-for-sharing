import React, { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
import ProjectCardForm from "./ProjectCardForm";

const ProjectCard = ({ project, isEditable, update }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <>
          <ProjectEditForm
            project={project}
            setIsEditing={setIsEditing}
            update={update}
          />
        </>
      ) : (
        <ProjectCardForm
          project={project}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
};

export default ProjectCard;
