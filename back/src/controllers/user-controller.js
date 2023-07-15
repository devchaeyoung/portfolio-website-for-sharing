import is from "@sindresorhus/is";
import { userAuthService } from "../services/userService";

const singUpUser = async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        // req (request) 에서 데이터 가져오기
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
        });

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }
        // 토큰 발급
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
};

const userList = async (req, res, next) => {
    try {
        // 전체 사용자 목록을 얻음
        const users = await userAuthService.getUsers();
        res.status(200).send(users);
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

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        // URI로부터 사용자 id를 추출함.
        const user_id = req.params.id;
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const name = req.body.name ?? null;
        const email = req.body.email ?? null;
        const password = req.body.password ?? null;
        const description = req.body.description ?? null;

        const toUpdate = { name, email, password, description };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await userAuthService.setUser({
            user_id,
            toUpdate,
        });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const userSearch = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const currentUserInfo = await userAuthService.getUserInfo(user_id);

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
};

const userJWT = async (req, res) => {
    res.status(200).send(
        `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
};

const logoutUser = async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        console.log(user_id);
        const user = userAuthService.getUserInfo(user_id);
        user.token = null;
        await user.save();

        res.cookie("token", null, {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });
        res.status(200).send("로그아웃 되었습니다.");
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

        res.status(200).json(deletedUser);
        res.cookie("token", null, { maxAge: 0 })
            .status(200)
            .send("정상적으로 탈퇴 되었습니다.");
    } catch (error) {
        next(error);
    }
};

const setPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userAuthService.setUserPassword({ email });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export {
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
};
