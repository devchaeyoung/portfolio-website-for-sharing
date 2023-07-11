import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
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
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
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
