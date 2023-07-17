import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
	{
		title: {
			type: String,
			optional: true,
		},
		info: {
			type: String,
			optional: true,
		},
		issuer: {
			type: String,
			optional: true,
		},
		date: {
			type: Date,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const AwardModel = model("Award", AwardSchema);
export { AwardModel };
