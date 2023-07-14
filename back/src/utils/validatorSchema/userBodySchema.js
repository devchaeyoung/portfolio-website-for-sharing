import joi from "joi";
import { v4 as uuidv4 } from "uuid";

//현재 현재 개발되지않은 페이지네이션 등, 유효성 검사 항목이 제한적임. 추가 필요

class userBodySchema {
    static signup() {
        return joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).required(),
        });
    }
    static login() {
        return joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(4).required(),
        });
    }

    static userToken() {
        // 사용자의 토큰이 uuidv4 형식인지 확인
        return joi.string().guid({ version: "uuidv4" }).required();
    }

    static userUpdate() {
        return joi.object({
            name: joi.string().optional(),
            email: joi.string().email().optional(),
            password: joi.string().min(4).optional(),
            description: joi.string().optional(),
        });
    }
}

export { userBodySchema };
