import mongoose, { Schema, model } from "mongoose";

const AwardSchema = new Schema(
    {
        title: {
            type: String,
        },
        info: {
            type: String,
            required: true,
        },
        issuer: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const AwardModel = model("Award", AwardSchema);
export { AwardModel };
