const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/dmn19/image/upload/v1596620960/user-icon-image-placeholder-300-grey-min.jpg",
    },
    method: {
      type: String,
      enum: ["SITE", "GOOGLE"],
      default: "SITE",
    },
    workplaces: [
      {
        workplace: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "workplace",
        },
        date: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["JOINED", "REQUESTED", "LEFT", "REMOVED"],
          default: "JOINED",
        },
      },
    ],
    profile: {
      mobile: {
        type: String,
      },
      gender: {
        type: String,
        enum: ["M", "F", "O"], //male female other (empty if prefer not to say selected)
      },
      company: {
        name: {
          type: String,
        },
        role: {
          type: String,
        },
      },
      residence: {
        type: String,
      },
      bio: {
        type: String,
      },
      social: {
        twitter: {
          type: String,
        },
        website: {
          type: String,
        },
        instagram: {
          type: String,
        },
        linkedin: {
          type: String,
        },
      },
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DISABLED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", schema);
