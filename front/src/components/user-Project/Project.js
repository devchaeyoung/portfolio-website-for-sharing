import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";
import ProjectCard from "./ProjectCard";
import { Button } from "react-bootstrap";
import ProjectAdd from "./ProjectAdd";
import { ForestStateContext } from "../Portfolio";

const Project = ({ portfolioOwnerId, isEditable }) => {
  // useState 훅을 통해 user 상태를 생성함.
  const [project, setProject] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const { setForestLength } = useContext(ForestStateContext);

  const getProject = async () => {
    const res = await Api.get("project", portfolioOwnerId);
    setProject(res.data);
    if (res.data.length !== 0) {
      setForestLength((prev) => {
        return { ...prev, project: true };
      });
    } else if (res.data.length === 0) {
      setForestLength((prev) => {
        return { ...prev, project: false };
      });
    }
  };
  useEffect(() => {
    getProject();
  }, [portfolioOwnerId]);

  return (
    <>
      {project ? (
        project.map((project) => {
          return (
            <ProjectCard
              key={project._id}
              isEditable={isEditable}
              project={project}
              getProject={getProject}
            />
          );
        })
      ) : (
        <></>
      )}

      {isPost ? (
        <ProjectAdd
          setIsPost={setIsPost}
          setProject={setProject}
          portfolioOwnerId={portfolioOwnerId}
        />
      ) : (
        <></>
      )}
      {isEditable && !isPost ? (
        <Button variant="outline-success" onClick={() => setIsPost(true)}>
          프로젝트 추가
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Project;
