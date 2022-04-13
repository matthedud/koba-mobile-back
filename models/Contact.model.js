const { Schema, model } = require("mongoose");
const {typeContactSchema} = require('./TypeContact.model')
const {adresseSchema} = require('./Adresse.model')

const telephoneSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    numero: {
      type: String,
      required: true,
    },
  }
)

exports.contactSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    telephone: {
        type: telephoneSchema,
        required: true,
    },
    adresse: {
      type: adresseSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    commentaire: String,
    typeContact: {
      type: typeContactSchema,
      required: true,
    }
  },
);

exports.Contact = model("Contact", exports.contactSchema);
