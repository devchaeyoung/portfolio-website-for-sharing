import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const NetworkNavigate = () => {
  return (
    <div>
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            프론트
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            백
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            데브옵스
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            데이터분석
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            AI
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            웹
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            앱
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NetworkNavigate;
