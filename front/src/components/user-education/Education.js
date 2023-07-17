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

  /*학력 추가 함수  */
  const addEducation = (updateData) => {
    const newEducations = [...educations, updateData];
    setEducations(newEducations);
  };

  /*수정 함수 */
  const editEducation = (id, updateData) => {
    // let findIndex = educations.findIndex((education) => education._id === id);
    // let newEducation = [...educations];
    // newEducation[findIndex] = updateData;
    // setEducations(newEducation);

    // setEducations(
    //   educations.map((education) =>
    //     education._id === id ? { ...updateData } : education
    //   )
    //);
    const newEducations = educations.map((education) =>
      education._id === id ? { ...updateData } : education
    );

    setEducations(newEducations);
  };

  /*삭제 함수 */
  const deleteEducation = (id) => {
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
        <></>
      )}

      {isPost ? (
        <EducationInputForm setIsPost={setIsPost} addEducation={addEducation} />
      ) : (
        <></>
      )}

      {isEditable && !isPost ? (
        <Button onClick={() => setIsPost(true)}>학력 추가</Button>
      ) : (
        <></>
      )}
    </>
  );
}

export default Education;
