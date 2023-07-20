import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import "./Portfolio.style.css";
import { ForestStateContext } from "./Portfolio";

const IMAGELIST = [
  "/img/ground",
  "/img/profile-length1",
  "/img/profile-length2",
  "/img/profile-length3",
  "/img/profile-length4",
];
const ProfileForest = () => {
  const { forestLength } = useContext(ForestStateContext);
  const length = Object.values(forestLength).filter((item) => item).length;

  return (
    <div className="profile-forest">
      <Image
        src={process.env.PUBLIC_URL + `${IMAGELIST[length]}.png`}
        width="300px"
        alt="image"
        className="profile-ground"
      />
    </div>
  );
  // return (
  //   <div className="profile-forest">
  //     <Image
  //       src={process.env.PUBLIC_URL + "/img/ground.png"}
  //       width="300px"
  //       alt="image"
  //       className="profile-ground"
  //     />
  //     <Image
  //       src={process.env.PUBLIC_URL + "/img/profileTree.png"}
  //       width="300px"
  //       alt="image"
  //       className="profile-tree"
  //     />
  //     <Image
  //       src={process.env.PUBLIC_URL + "/img/grass.png"}
  //       width="300px"
  //       alt="image"
  //       className="profile-grass"
  //     />
  //     <Image
  //       src={process.env.PUBLIC_URL + "/img/flower.png"}
  //       width="300px"
  //       alt="image"
  //       className="profile-flower"
  //     />
  //   </div>
  // );
};

export default ProfileForest;
