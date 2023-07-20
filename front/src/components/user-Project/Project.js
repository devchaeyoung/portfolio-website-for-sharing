import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";
import ProjectCard from "./ProjectCard";
import { Button } from "react-bootstrap";
import ProjectAdd from "./ProjectAdd";
import { ForestStateContext } from "../Portfolio";

const Project = ({ portfolioOwnerId, isEditable })  => {
  // useState 훅을 통해 user 상태를 생성함.
  const [project, setProject] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const { setForestLength } = useContext(ForestStateContext);

  useEffect(() => {
    Api.get("project", portfolioOwnerId).then((res) => {
      setProject(res.data);
    });
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
              setProjct={setProject}
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
}

export default Project;
