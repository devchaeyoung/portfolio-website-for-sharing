import React from "react";
import { Image } from "react-bootstrap";

import "./Portfolio.style.css";

const ProfileForest = () => {
  return (
    <>
      <Image
        src={process.env.PUBLIC_URL + "/img/ground.png"}
        width="300px"
        alt="image"
        className="profile-ground"
      />
      <Image
        src={process.env.PUBLIC_URL + "/img/profileTree.png"}
        width="300px"
        alt="image"
        className="profile-tree"
      />
      <Image
        src={process.env.PUBLIC_URL + "/img/grass.png"}
        width="300px"
        alt="image"
        className="profile-grass"
      />
      <Image
        src={process.env.PUBLIC_URL + "/img/flower.png"}
        width="300px"
        alt="image"
        className="profile-flower"
      />
    </>
  );
};

export default ProfileForest;
