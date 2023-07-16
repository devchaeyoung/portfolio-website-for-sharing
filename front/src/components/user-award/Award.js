import React, { useState, useEffect } from "react";
import UserAwardEdit from "./UserAwardEdit";
import UserAwardCard from "./UserAwardCard";
import * as Api from "../../api";

function Award ({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [awardData, setAwardData] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("award", portfolioOwnerId).then((res) => setAwardData(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? ( 
        <UserAwardEdit
         awardData={awardData}
         setIsEditing={setIsEditing}
         setAwardData={setAwardData}
        />
    ) : (
        <UserAwardCard
         awardData={awardData}
         setIsEditing={setIsEditing}
         isEditable={isEditable}
        />
    )}
    
    </>
  );
}

export default Award;
