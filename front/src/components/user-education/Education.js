import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";
import EducationCard from "./EducationCard";
import { Button } from "react-bootstrap";
import EducationInputForm from "./EducationInputForm";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";
import { ForestStateContext } from "../Portfolio";

function Education({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);
  const { setForestLength } = useContext(ForestStateContext);
  //DB에서 다시 가져오는 거
  const getEducation = async () => {
    try {
      await Api.get("education", portfolioOwnerId).then((res) => {
        setEducations(res.data);
        //이건 숲 이미지

        res.data.length !== 0
          ? setForestLength((prev) => {
              return { ...prev, education: true };
            })
          : setForestLength((prev) => {
              return { ...prev, education: false };
            });
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
              getEducation={getEducation}
            />
          );
        })}
      {isPost && (
        <EducationInputForm setIsPost={setIsPost} getEducation={getEducation} />
      )}
      {isEditable && !isPost && (
        <Button variant="outline-success" onClick={() => setIsPost(true)}>
          학력 추가
        </Button>
      )}
    </>
  );
}

export default Education;
