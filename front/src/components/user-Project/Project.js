import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import ProjectEditForm from "./ProjectEditForm";
import ProjectCard from "./ProjectCard";

function Project({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [project, setProject] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("project", portfolioOwnerId).then((res) => {
      setProject(res.data[0]);
      console.log("프로젝트값", res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <>
      {/*       
      {projects.map((project) =>
        isEditing ? (
          <ProjectEditForm
            key={project._id}
            project={project}
            setIsEditing={setIsEditing}
            setEducation={setProjects}
          />
        ) : (
          <ProjectCard
            key={project._id}
            project={project}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          />
        )
      )} */}

      {isEditing ? (
        <ProjectEditForm
          project={project}
          setIsEditing={setIsEditing}
          setProject={setProject}
        />
      ) : (
        <ProjectCard
          project={project}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}

      {/* {isEditing ? (
        <ProjectEditForm
          project={project}
          setIsEditing={setIsEditing}
          setProject={setProject}
        />
      ) : (
        <ProjectCard
          project={project}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )} */}
    </>
  );
}

export default Project;
