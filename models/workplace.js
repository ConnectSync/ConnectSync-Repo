const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        role: {
          type: String,
          enum: ["ADMIN", "BASIC"],
          default: "BASIC",
        },
        status: {
          type: String,
          enum: ["JOINED", "LEFT", "REMOVED", "ADDED", "PENDING"],
          default: "JOINED",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    type: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC",
    },
  },
  { timestamps: true }
);

module.exports = Workplace = mongoose.model("workplace", schema);
