import React, { useState } from "react";

async function fetchCat() {
  const openAPI = "http://placekitten.com";
  const res = await fetch(`${openAPI}/cat?json=true`);
  const resJson = await res.json();
  console.log();
  return `${openAPI}/${resJson.url}`;
}

export function CatImage() {
  const initImage = "http://placekitten.com/200/200";
  const [catImage, setCatImage] = React.useState(initImage);
  const handleChangeCat = async () => {
    const newImage = await fetchCat();
    setCatImage(newImage);
  };
}
