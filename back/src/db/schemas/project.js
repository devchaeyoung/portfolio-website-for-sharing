const shortId = require("./type/short_id");
import mongoose, { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
        shortId,
        title: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: false,
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

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
