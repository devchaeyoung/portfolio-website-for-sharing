import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";
import EducationCard from "./EducationCard";
import { Button } from "react-bootstrap";
import EducationInputForm from "./EducationInputForm";
import { LoadingStateContext } from "../../App";

function Education({ portfolioOwnerId, isEditable, setForestLength }) {
  const [educations, setEducations] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  const getEducation = async () => {
    try {
      await Api.get("education", portfolioOwnerId).then((res) => {
        setEducations(res.data);
        if (res.data.length) {
          setForestLength((prev) => {
            return { ...prev, education: true };
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    isFetchCompleted && setIsFetchCompleted(false);
    getEducation();
    setIsFetchCompleted(true);
  }, []);

  return (
    <>
      {educations &&
        educations.map((education) => {
          return (
            <EducationCard
              key={education._id}
              isEditable={isEditable}
              education={education}
              setEducations={setEducations}
            />
          );
        })}
      {isPost && (
        <EducationInputForm
          setIsPost={setIsPost}
          setEducations={setEducations}
        />
      )}
      {isEditable && !isPost && (
        <Button variant="success" onClick={() => setIsPost(true)}>
          학력 추가
        </Button>
      )}
    </>
  );
}

export default Education;
