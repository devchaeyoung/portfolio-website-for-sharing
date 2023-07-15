import React from "react";
import { Button } from "react-bootstrap";

function AddButton() {
  const topics = [{ title }, {}];
  return (
    <>
      {topics.map((topic) => (
        <Button key={topic.id}>{topic.title}</Button>
      ))}
    </>
  );
}
