const { Schema, model } = require("mongoose");

exports.pointageSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    dureeDeplacement: {
      type: String,
      required: true,
    },
    pause: {
      type: String,
      required: true,
    },
    chantierID: {
      type: String,
      required: true,
    },
  }
);

exports.Pointage = model("Pointage", pointageSchema);
