import React from "react";

import NetworkNavigationBar from "../nav/NetworkNavigationBar";
import UserListBox from "../user/UserListBox";
import Footer from "../main/Footer";

import "./style/network.style.css";

const devMajor = [
  { id: "front", title: "프론트" },
  { id: "back", title: "백" },
  { id: "devops", title: "데브옵스" },
  { id: "data-analysis", title: "데브옵스" },
  { id: "ai", title: "데브옵스" },
  { id: "web", title: "웹" },
  { id: "app", title: "앱" },
];

function Network() {
  return (
    <div>
      <NetworkNavigationBar />
      <main className="user-network-container">
        {devMajor.map((item) => (
          <>
            <h2 className="network-title" key={item?.id} id={item.id}>
              {item?.title}
            </h2>
            <UserListBox />
          </>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Network;
