const { Schema, model } = require("mongoose");
const { interventionSchema } = require("./Intervention.model");

exports.pointageSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      default:new Date,
    },
    dureeDeplacement: {
      type: String,
      required: true,
    },
    pause: {
      type: String,
      required: true,
      default:"01:00"
    },
    chantierID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    intervention: [interventionSchema]
  }
);

exports.Pointage = model("Pointage", this.pointageSchema);
