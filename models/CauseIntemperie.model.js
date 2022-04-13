const { Schema, model } = require("mongoose");

exports.causeIntemperieSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
  }
);

exports.CauseIntemperie = model("CauseIntemperie", causeIntemperieSchema);