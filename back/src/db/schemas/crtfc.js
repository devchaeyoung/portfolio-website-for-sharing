import { Schema, model } from "mongoose";

const crtfcSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    licence: {
      type: Number,
      required: true,
    },
    issuedDate: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
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
