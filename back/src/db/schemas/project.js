import mongoose, { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            default: () =>
                new Date().valueOf() +
                Math.random().toString(36).substring(2, 15),
        },
        projectName: {
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
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
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
