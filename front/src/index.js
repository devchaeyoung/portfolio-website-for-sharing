import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const Loading = () => {
  return <h1>서스펜스 로딩중이야</h1>;
};
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
