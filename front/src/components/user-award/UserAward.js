import React, { useState, useEffect } from "react";
import UserAwardEdit from "./UserAwardEdit";
import UserAwardCard from "./UserAwardCard";
import * as Api from "../../api";

function Award ({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 user 상태를 생성함.
  const [award, setAward] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("award", portfolioOwnerId).then((res) => setAward(res.data));
  }, [portfolioOwnerId]);


  const updateAward = (id, updateData) => {
    setAward(
      setAward.map((award) =>
        award._id === id ? {...updateData} : award ) 
    );
  };

  const deleteAward = (id) => {
    setAward(
      award.fiter((award) => award._id !== id)
    );
  }   
  


  // const addAward()


  return (
    <>
      {award.map((award) => (
        <UserAwardCard
         key={award._id}
         award={award}
         isEditable={isEditable}
         updateAward={updateAward}
         deleteAward={deleteAward}
        />
        ))};
    </>
  );
}

export default Award;
