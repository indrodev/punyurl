const mongoose = require("mongoose")

const VisitorSchema = new mongoose.Schema({
  _link: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
    required: true
  },

  headers: {
    type: Object,
    required: true
  },

  ip: String,

  hostName: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Visitor", VisitorSchema)
