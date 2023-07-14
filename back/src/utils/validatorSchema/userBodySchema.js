import joi from 'joi';

class userBodySchema {
	static signup(){
		return joi.object({
			name: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().min(4).required(),
		})
	}
	static loginSchema(){}

	static updateUserSchema(){}
}

export {userBodySchema}