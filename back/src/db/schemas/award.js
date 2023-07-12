const shortId = require("shortid");
import mongoose, { Schema, model } from "mongoose";

const AwardSchema = new Schema(
    {
        shortId,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const AwardModel = model("Award", AwardSchema);
export { AwardModel };
