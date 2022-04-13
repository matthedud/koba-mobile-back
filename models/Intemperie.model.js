const { Schema, model } = require("mongoose");
const {typeIntemperieSchema} = require('./TypeIntemperie.model')

exports.intemperieSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    salarie: { type: Schema.Types.ObjectId, ref: 'Salarie', required: true, },
    commentaire: String,
    cause: {
      type: typeIntemperieSchema,
      required: true,
    }
  }
);

exports.Intemperie = model("Intemperie", intemperieSchema);

