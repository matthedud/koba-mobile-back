const { Schema, model } = require("mongoose");

exports.typeIntemperieSchema = new Schema(
  {
    nom: {
        type: String,
        required: true,
    },
  }
);

exports.TypeIntemperie = model("TypeIntemperie", typeIntemperieSchema);
