const mongoose = require("mongoose")

const LinkSchema = new mongoose.Schema({

  shortLink: {
    type: String,
    required: true,
    unique: true
  },

  originalLink: {
    type: String,
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  isPasswordProtected: {
    type: Boolean,
    default: false
  },

  password: String,

  expireAt: Date,

  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Link", LinkSchema)
