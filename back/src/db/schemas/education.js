import mongoose, { Schema, model } from "mongoose";


const educationSchema = new Schema(
    {
        schoolName : {
            type : String,
            required :true,
        },
        major : {
            type : String,
            required :true,
        },
        crnt : {
            type : String,
            required :true,

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


const educationModel = model("Education", educationSchema);

export {educationModel};