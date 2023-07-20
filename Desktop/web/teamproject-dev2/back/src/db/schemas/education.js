import { Schema, model } from "mongoose";

const educationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        major: {
            type: String,
            required: true,
        },
        grades: {
            type: Number,
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
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const EducationModel = model("education", educationSchema);

export { EducationModel };
