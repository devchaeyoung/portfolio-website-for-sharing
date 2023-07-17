import React from "react";

import NetworkNavigationBar from "../nav/NetworkNavigationBar";
import UserListBox from "../user/UserListBox";
import Footer from "../main/Footer";

function Network() {
  return (
    <div>
      <header>
        <NetworkNavigationBar />
      </header>
      <main>
        <div className="userList">
          <UserListBox />
          <h2>다른 사용자 포트폴리오 조회 레이아웃입니다.</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Network;
