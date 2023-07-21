import React, { useState, useEffect, useContext } from "react";
import UserAwardAdd from "./UserAwardAdd";
import UserAwardCard from "./UserAwardCard";
import * as Api from "../../api";
import { Button } from "react-bootstrap";
import { ForestStateContext } from "../Portfolio";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

function UserAward({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 user 상태를 생성함.
  const [award, setAward] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const { setForestLength } = useContext(ForestStateContext);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);

  useEffect(() => {
    isFetchCompleted && setIsFetchCompleted(false);
    Api.get("award", portfolioOwnerId).then((res) => {
      setAward(res.data);
      if (res.data.length !== 0) {
        setForestLength((prev) => {
          return { ...prev, award: true };
        });
      }
    });
    setIsFetchCompleted(true);
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
            />
          );
        })
      ) : (
        <></>
      )}

      {isPost ? (
        <UserAwardAdd
          setIsPost={setIsPost}
          setAward={setAward}
          portfolioOwnerId={portfolioOwnerId}
        />
      ) : (
        <></>
      )}

      {isEditable && !isPost ? (
        <Button variant="outline-success" onClick={() => setIsPost(true)}>
          수상내역 추가
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserAward;
