const { Schema, model } = require("mongoose");

const mainDoeuvreSchema = new Schema(
  {
    salarieID: { type: Schema.Types.ObjectId, ref: 'Salarie', required: true, },
    tauxHoraire: {
      type: Number,
      required: true,
    },
  }
)

exports.interventionSchema = new Schema(
  {
    pointageID: { type: Schema.Types.ObjectId, ref: 'Pointage', required: true, },
    tacheChantierID: {
      type: String,
      required: true,
    },
    duree: {
      type: String,
      required: true,
    },
    quantite: {
      type: Number,
      required: true,
    },
    commentaire: String,
    mainDoeuvre: {
        type: mainDoeuvreSchema,
        required: true,
    },
  }
);

exports.Intervention = model("Intervention", exports.interventionSchema);
