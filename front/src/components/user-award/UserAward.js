import React, { useState, useEffect } from "react";
import UserAwardAdd from "./UserAwardAdd";
import UserAwardCard from "./UserAwardCard";
import * as Api from "../../api";
import { Button } from "react-bootstrap";

function UserAward ({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 user 상태를 생성함.
  const [award, setAward] = useState(null);
  const [isPost, setIsPost] = useState(false);


  useEffect(() => {
    Api.get("award", portfolioOwnerId).then((res) => {
      setAward(res.data);
    });
  }, [portfolioOwnerId]);



  return (
    <>
      {award ? (
        award.map((award) => {
          return (
            <UserAwardCard
              key={award._id}
              isEditable={isEditable}
              award={award}
              setAward={setAward}
             
              // editAward={editAward}
              // deleteAward={deleteAward}
            />
          );
        })
      ) : (
          <></>
      )}
  
      {isPost ? (
         <UserAwardAdd setIsPost={setIsPost} setAward={setAward} />
      ) : (
         <></>
      )}
  
      {isEditable && !isPost ? (
        <Button variant="outline-success" onClick={() => setIsPost(true)}>수상내역 추가</Button>
      ) : (
        <></>
      )}
      </>
  );
}

export default UserAward;
