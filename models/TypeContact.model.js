const { Schema, model } = require("mongoose");

exports.typeContactSchema = new Schema(
  {
    nom: {
        type: String,
        required: true,
    },
  }
);

exports.TypeContact = model("TypeContact", typeContactSchema);
