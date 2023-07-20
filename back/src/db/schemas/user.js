import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		stacks: {
			type: Array,
			required: false,
		},
		description: {
			type: String,
			required: false,
			default: "자신을 자유롭게 표현해주세요.",
		},
		profileImage: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const UserModel = model("User", UserSchema);

export { UserModel };
