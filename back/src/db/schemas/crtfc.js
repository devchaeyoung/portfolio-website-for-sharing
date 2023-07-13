import mongoose, { Schema, model } from "mongoose";


const crtfcSchema = new Schema(
    {
        title : {
            type : String,
            required :true,
        },
        licence : {
            type : String,
            required :true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        issuer : {
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


const crtfcModel = model("crtfc", crtfcSchema);

export {crtfcModel};