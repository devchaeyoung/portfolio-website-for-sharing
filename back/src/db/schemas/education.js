import { Schema, model } from "mongoose";


const educationSchema = new Schema(
    {
        title : {
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
        startDate : {
            type : Date,
            required : true,
        },
        endDate : {
            type : Date,
            required : true,
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