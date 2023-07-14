import Joi from "joi";

export default {
    singUpSchema: Joi.object({
        email: "",
    }),
};
