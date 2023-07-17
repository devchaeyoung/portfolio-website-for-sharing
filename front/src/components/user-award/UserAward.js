import React, { useState, useEffect } from "react";
import UserAwardEdit from "./UserAwardEdit";
import UserAwardCard from "./UserAwardCard";
import * as Api from "../../api";
import { Button } from "react-bootstrap";

function Award ({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 user 상태를 생성함.
  const [award, setAward] = useState([]);
  const [isPost, setIsPost] = useState(false);
  useEffect(() => {
    
    Api.get("award", portfolioOwnerId).then((res) => setAward(res.data));
  }, [portfolioOwnerId]);

  const addAward = (updateData) => {
    const newAward = [...award, updateData];
    setAward(newAward);
  };


  const editAward = (id, updateData) => {
    const newAward = award.map((award) =>
      award._id === id ? {...updateData} : award);

    setAward(newAward);
  };

  const deleteAward = (id) => {
    setAward(
      award.fiter((award) => award._id !== id)
    );
  }   


  return (
    <>
      {award ? (
        award.map((award) => {
          return (
            <UserAwardCard
              key={award._id}
              award={award}
              isEditable={isEditable}
              editAward={editAward}
              deleteAward={deleteAward}
            />
          );
        })
      ) : (
          <></>
      )}
  
      {isPost ? (
         <UserAwardEdit setIsPost={setIsPost} addAward={addAward} />
      ) : (
         <></>
      )}
  
      {isEditable && !isPost ? (
        <Button variant="outline-success" onClick={() => setIsPost(true)}>어워드 추가</Button>
      ) : (
        <></>
      )}
      </>
  );
}

export default Award;
