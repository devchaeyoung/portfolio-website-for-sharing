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

  // 뭐가 더 나을까
  const updateEducation = (id, updateData) => {
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

  return (
    <>
      {console.log(educations)}
      {educations.length ? (
        educations.map((education) => {
          return (
            <EducationCard
              key={education._id}
              isEditable={isEditable}
              education={education}
              onEdit={updateEducation}
            />
          );
        })
      ) : (
        <> </>
      )}
      <Button>학력 추가</Button>
    </>
  );
}

export default Education;
