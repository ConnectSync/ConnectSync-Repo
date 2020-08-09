const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      default: 'v1596632521/vector60-7915-01.jpg',
    },
    description: {
      type: String,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        role: {
          type: String,
          enum: ['ADMIN', 'BASIC'],
          default: 'BASIC',
        },
        status: {
          type: String,
          enum: ['JOINED', 'LEFT', 'REMOVED', 'ADDED', 'PENDING'],
          default: 'JOINED',
        },
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
      default: 'PUBLIC',
    },
  },
  { timestamps: true }
);

module.exports = Workplace = mongoose.model('workplace', schema);
