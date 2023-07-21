import React from "react";
import UserNetworkCard from "./UserNetworkCard";

import "./style/userListBox.style.css";

function UserListBox({ devMajor, users, stack }) {
  return (
    <div className="user-network-list">
      {users?.map((user) => {
        if (user?.stacks.find((userStack) => userStack === stack)) {
          return (
            <div className="user-network-item-wrapper">
              <UserNetworkCard
                key={user._id}
                user={user}
                isEditable={false}
                isNetwork
                className="card"
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default UserListBox;
