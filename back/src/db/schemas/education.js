import { Schema, model } from "mongoose";


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
            type: String,
            required: true,
        },
        


    },
    {
        timestamps: true,
    }
    
);


const educationModel = model("educationModel", educationSchema);

export {educationModel};