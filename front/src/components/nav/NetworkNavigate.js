import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import UserNetworkCard from "../user/UserNetworkCard";

const NetworkNavigate = () => {
  return (
    <div>
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#front">
            프론트
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#back">
            백
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#devops">
            데브옵스
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#data-analysis">
            데이터분석
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#ai">
            AI
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#web">
            웹
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#app">
            앱
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NetworkNavigate;
