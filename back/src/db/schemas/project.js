import mongoose, { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
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
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
