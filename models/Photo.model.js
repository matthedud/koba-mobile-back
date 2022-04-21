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
    date:{
      type:Date,
      required:true,
      default:new Date(),
    },
    commentaire: String,
  },
);

exports.Photo = model("Photo", exports.photoSchema);
