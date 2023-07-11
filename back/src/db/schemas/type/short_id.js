// const nanoid = require("nanoid");
// nanoid 는 21개의 고유 번호를 생성해주는 패키지. 현재
// 최신버전은 require 를 지원하지 않음. import만 지원함
// 그렇기 때문에 npm i nanoid@2.1.11 를 사용
// 현재 나노아이디를 리콰이어할 때 함수형으로 받으면 오류가생김. 왜인지는 아직 모르겠음
import { nanoid } from "nanoid";

const shortId = {
    type: String,
    default: () => {
        return nanoid();
    },
    require: true,
    index: true,
};

export { shortId };
