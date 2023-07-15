import is from "@sindresorhus/is";
import { userAuthService } from "../services/userService";
const { StatusCodes } = require("http-status-codes");
const code = StatusCodes;

const singUpUser = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const inputValue = req.body;
    const createUser = await userAuthService.createUser(inputValue);

    if (createUser.errorMessage) {
      throw new Error(createUser.errorMessage);
    }

    res.status(code.CREATED).json(createUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }
    // 토큰 발급
    res.status(code.OK).send(user);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userAuthService.getUsers();
    res.status(code.OK).send(users);
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const user_id = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo(user_id);

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(code.OK).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const inputValue = req.body;
    const updatedUser = await userAuthService.updateUser({
      user_id,
      inputValue,
    });

    res.status(code.CREATED).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo(user_id);

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(code.OK).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
};

const userJWT = async (req, res) => {
  res
    .status(code.OK)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
};

const logoutUser = async (req, res, next) => {
  try {
    res
      .cookie("token", null, { maxAge: 0 })
      .status(code.OK)
      .send("로그아웃 되었습니다.");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const deletedUser = await userAuthService.deleteUser(user_id);

    if (deletedUser.errorMessage) {
      throw new Error(deletedUser.errorMessage);
    }

    res.status(code.NO_CONTENT).json(deletedUser);
    res
      .cookie("token", null, { maxAge: 0 })
      .status(code.NO_CONTENT)
      .send("정상적으로 탈퇴 되었습니다.");
  } catch (error) {
    next(error);
  }
};

const setPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await userAuthService.setUserPassword(email);
    res.status(code.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export {
  singUpUser,
  loginUser,
  getUsers,
  currentUser,
  updateUser,
  getUser,
  userJWT,
  logoutUser,
  deleteUser,
  setPassword,
};
