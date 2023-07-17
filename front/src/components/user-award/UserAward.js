import React, { useState, useEffect } from "react";
import UserAwardEdit from "./UserAwardEdit";
import UserAwardCard from "./UserAwardCard";
import * as Api from "../../api";

function Award ({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 user 상태를 생성함.
  const [award, setAward] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("award", portfolioOwnerId).then((res) => setAwardData(res.data));
  }, [portfolioOwnerId]);


  const editAward = (id, updateData) => {
    setAward(
      setAward.map((award) =>
        award._id === id ? {...updateData} : award ) 
    );
  };

  const deleteAward = (id) => {
    

  }

  const deleteProject = async () => {
    Api.delete("award", id);
    
        alert('삭제되었습니다.');
      });
    }
  };


  // const addAward()


  return (
    <>
      {awardData.map((award) => (
        <UserAwardCard
         key={award._id}
         award={award}
         isEditable={isEditable}
         editAward={editAward}
         deleteAward={deleteAward}
        />
        ))};
    </>
  );
}

export default Award;
