const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim:true
    },
    subject: {
      type: String,
      required: true,
      trim:true
    },
    marks: {
      type: Number,
      required: true,
      trim:true
    },
    user: {
      type: objectId,
      ref: 'admin',
    },
    isDeleted:{
      type: Boolean,
      default:false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentSchema);