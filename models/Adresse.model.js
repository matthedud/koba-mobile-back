const { Schema, model } = require("mongoose");

exports.adresseSchema = new Schema(
  {
    rue: {
        type: String,
        required: true,
    },
    codePostal: {
        type: Number,
        required: true,
    },
    pays: {
        type: String,
        required: true,
    },
  }
);

exports.Adresse = model("Adresse", adresseSchema);
