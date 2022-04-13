const { Schema, model } = require("mongoose");

exports.typeSalarieSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
  }
);

exports.TypeSalarie = model("TypeSalarie", exports.typeSalarieSchema);
