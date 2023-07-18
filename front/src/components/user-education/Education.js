import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import EducationCard from "./EducationCard";
import { Button } from "react-bootstrap";
import EducationInputForm from "./EducationInputForm";

function Education({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState(null);
  const [isPost, setIsPost] = useState(false);

  useEffect(() => {
    Api.get("education", portfolioOwnerId).then((res) => {
      setEducations(res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <>
      {educations ? (
        educations.map((education) => {
          return (
            <EducationCard
              key={education._id}
              isEditable={isEditable}
              education={education}
              setEducations={setEducations}
            />
          );
        })
      ) : (
        <></>
      )}
      {isPost ? (
        <EducationInputForm
          setIsPost={setIsPost}
          setEducations={setEducations}
        />
      ) : (
        <></>
      )}
      {isEditable && !isPost ? (
        <Button variant="success" onClick={() => setIsPost(true)}>
          학력 추가
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}

export default Education;
