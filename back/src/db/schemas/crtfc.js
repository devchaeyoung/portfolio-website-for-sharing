import { Schema, model } from "mongoose";

const crtfcSchema = new Schema(
    {
        title : {
            type : String,
            required :true,
        },
        license : {
            type : Number,
            required :true,
        },
        issuedDate: {
            type: Date,
            required: true,
        },
        issuer : {
            type : String,
            required :true,
        },
        langscore: {
            type: Number,
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

const crtfcModel = model("crtfc", crtfcSchema);

export { crtfcModel };
