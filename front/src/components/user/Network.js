import React from "react";

import NetworkNavigationBar from "../nav/NetworkNavigationBar";
import UserListBox from "../user/UserListBox";
import Footer from "../main/Footer";

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
      <header>
        <NetworkNavigationBar />
      </header>
      <main>
        <p className="network-title" id={devMajor?.id}>
          {devMajor?.title}
        </p>
        <div className="userList" id={devMajor}>
          <UserListBox />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Network;
