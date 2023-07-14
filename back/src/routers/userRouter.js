import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { createValidator } from "express-joi-validation";
import { userBodySchema } from "../utils/validatorSchema/userBodySchema";

import {
<<<<<<< HEAD
    singUpUser,
    loginUser,
    userList,
    currentUser,
    updateUser,
    userSearch,
    userJWT,
    logoutUser,
    deleteUser,
    setPassword,
=======
  singUpUser,
  loginUser,
  userList,
  currentUser,
  updateUser,
  userSearch,
  userJWT,
  logoutUser,
  deleteUser,
  setPassword,
>>>>>>> 64c2390c5f1d7d13e160547f245ce0fa5bdd1e35
} from "../controllers/user-controller";

const validator = createValidator();

const userAuthRouter = Router();

// 회원가입 라우터
userAuthRouter.post("/user/register", singUpUser);

// 로그인 라우터
userAuthRouter.post("/user/login", loginUser);

// 유저리스트 라우터
userAuthRouter.get("/userlist", login_required, userList);

// 현재 사용자 라우터
userAuthRouter.get("/user/current", login_required, currentUser);

// 사용자 정보 업데이트 라우터
userAuthRouter.put("/users/:id", login_required, updateUser);

// 다른 사용자 검색 라우터
userAuthRouter.get("/users/:id", login_required, userSearch);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, userJWT);

// 로그아웃 라우터
userAuthRouter.get("/user/logout", login_required, logoutUser);

// 회원탈퇴 라우터
userAuthRouter.delete("/user/:id", login_required, deleteUser);

// 비밀번호 변경 라우터
userAuthRouter.post("/user/reset-password", setPassword);

export { userAuthRouter };
