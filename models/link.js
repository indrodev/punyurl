const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const LinkSchema = new mongoose.Schema({

  shortLink: {
    type: String,
    required: true,
    unique: true,
    index: true
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

  expiresAt: Date,

  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

/* Hash password before saving link */
LinkSchema.pre("save", async function (next) {
  const link = this
  if (this.isPasswordProtected && (this.isModified("password") || this.isNew)) {
    try {
      link.password = await bcrypt.hash(link.password, process.env.SALT_ROUNDS || 10)
    } catch (error) {
      return next(error)
    }
  }
  return next()
})

/* Compare password if they are same */
LinkSchema.methods.comparePassword = async function (pw) {
  try {
    const isMatch = await bcrypt.compare(pw, this.password)
    if (isMatch === false) throw new Error("Credential Mismatch!")
  } catch (error) {
    throw error
  }
}

module.exports = mongoose.model("Link", LinkSchema)
