const Link = require("../../models/link")

module.exports = {

  async post(req, res) {
    try {
      const {
        originalLink, isPasswordProtected, password, expireAt 
      } = req.body

      if (!originalLink === undefined) return res.status(400).json({ error: true, reason: "Missing required fields" })

      const link = {
        originalLink,
        isPasswordProtected,
        password,
        expireAt,
        shortLink: Math.random()
      }

      const resp = await Link.create(link)

      return res.status(200).json({ error: false, resp })
    } catch (error) {
      return res.status(400).json({ error: true, reason: error.message })
    }
  }
}
