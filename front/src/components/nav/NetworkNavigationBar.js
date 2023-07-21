import React, { useState } from "react";
import "./NetworkNavigationBar.style.css";

function Nav({ devMajor, onClick, selectedStack }) {
  return (
    <nav className="network-navigation">
      {devMajor.map((stack) => (
        <span
          className={`network-nav-item ${
            selectedStack === stack ? "selected" : ""
          }`}
          key={stack.id}
          onClick={() => onClick(stack)}
        >
          <a className="network-link" href={`#${stack.id}`}>
            {stack.title}
          </a>
        </span>
      ))}
    </nav>
  );
}

const NetworkNavigationBar = ({ devMajor }) => {
  const [, setLink] = useState("");
  const [selectedStack, setSelectedStack] = useState("");

  const onClickLink = (stack) => {
    setLink(stack);
    setSelectedStack(stack);
  };

  return (
    <Nav
      onClick={onClickLink}
      devMajor={devMajor}
      selectedStack={selectedStack}
    />
  );
};

export default NetworkNavigationBar;
