import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import EducationCard from "./EducationCard";
import { Button } from "react-bootstrap";

function Education({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    Api.get("education", portfolioOwnerId).then((res) => {
      setEducations(res.data);
    });
  }, [portfolioOwnerId]);

  /*인덱스를 사용할지 map함수를 사용할지! */
  const editEducation = (id, updateData) => {
    // let findIndex = educations.findIndex((education) => education._id === id);
    // let newEducation = [...educations];
    // newEducation[findIndex] = updateData;
    // setEducations(newEducation);

    setEducations(
      educations.map((education) =>
        education._id === id ? { ...updateData } : education
      )
    );
  };

  const deleteEducation = (id) => {
    Api.delete("education", id);
    const newEducations = educations.filter(
      (education) => education._id !== id
    );
    setEducations(newEducations);
  };

  return (
    <>
      {educations ? (
        educations.map((education) => {
          return (
            <EducationCard
              key={education._id}
              isEditable={isEditable}
              education={education}
              editEducation={editEducation}
              deleteEducation={deleteEducation}
            />
          );
        })
      ) : (
        <> </>
      )}
      {isEditable ? <Button>학력 추가</Button> : <></>}
    </>
  );
}

export default Education;
