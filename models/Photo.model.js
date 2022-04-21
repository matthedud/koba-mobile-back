const { Schema, model } = require("mongoose");


exports.photoSchema = new Schema(
  {
    chantier: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    poste: {
      type: [Schema.Types.ObjectId],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    commentaire: String,
  },
);

exports.Photo = model("Photo", exports.photoSchema);
