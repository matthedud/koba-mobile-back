const { Schema, model } = require("mongoose");


// TODO: Please make sure you edit the user model to whatever makes sense in this case
exports.userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: {
      type: String,
      required: true,
    },
    salarie: { type: Schema.Types.ObjectId, ref: 'Salarie', required: true, },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

exports.User = model("User", exports.userSchema);
