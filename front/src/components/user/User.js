import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";

// 유저 portfolioOwnerId 속성(props)
// props가 어디서 넘어와?
function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("user", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  useEffect(() => {
    console.log(user);
  }, [isEditing, user]);

  return (
    <div className="user-card-edit">
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </div>
  );
}

export default User;
