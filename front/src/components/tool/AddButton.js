import React from "react";
import { Button } from "react-bootstrap";

function AddButton() {
  const topics = 11;
  return (
    <>
      {topics.map((topic) => (
        <Button key={topic.id}>{topic.title}</Button>
      ))}
    </>
  );
}

export default AddButton;
