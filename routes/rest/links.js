const Link = require("../../models/link")

module.exports = {

  async post(req, res) {
    try {
      return res.status(200).json({ error: false, data: "text" })
    } catch (error) {
      return res.status(400).json({ error: true, reason: error.message })
    }
  }
}
