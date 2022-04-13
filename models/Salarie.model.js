const { Schema, model } = require("mongoose");
const {contactSchema} = require('./Contact.model')
const {typeSalarieSchema} = require('./TypeSalarie.model')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
exports.salarieSchema = new Schema(
  {
    contact: {
      type: contactSchema,
      required: true,
    },
    tauxHoraire: {
      type: Number,
      required: true,
    },
    typeSalarie: {
      type: typeSalarieSchema,
      required: true,
    },
  },
);

exports.Salarie = model("Salarie", exports.salarieSchema);
