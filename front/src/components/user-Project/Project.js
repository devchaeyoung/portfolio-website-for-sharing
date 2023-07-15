import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import ProjectCard from "./ProjectCard";
import { Button } from "react-bootstrap";

function Project({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 user 상태를 생성함.
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Api.get("project", portfolioOwnerId).then((res) => {
      setProjects(res.data);
    });
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
  }, [portfolioOwnerId]);

  const updateProject = (id, updateData) => {
    let findIndex = projects.findIndex((project) => project._id === id);
    let newProjects = [...projects];
    console.log("인덱스", newProjects[findIndex]);
    newProjects[findIndex] = updateData;
    setProjects(newProjects);
  };
  // const updateProject = (id, updateData) => {
  //   projects.map((project) =>
  //     project._id === id ? updateData : project
  //   );
  // };

  return (
    <>
      {projects.length ? (
        projects.map((project) => {
          return (
            <ProjectCard
              key={project._id}
              isEditable={isEditable}
              project={project}
              update={updateProject}
            />
          );
        })
      ) : (
        <></>
      )}
      <Button>프로젝트 추가 </Button>

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
