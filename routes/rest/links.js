const moment = require("moment")
const shortId = require("shortid")
const Link = require("../../models/link")


module.exports = {

  async post(req, res) {
    try {
      let {
        // eslint-disable-next-line prefer-const
        originalLink,
        isPasswordProtected = false,
        password = null,
        expiresAt = null
      } = req.body
      const { user } = req
      // Validation needs to be implemented
      if (!originalLink === undefined) return res.status(400).json({ error: true, reason: "Missing required fields" })

      if (!user) {
        isPasswordProtected = false
        password = null
        expiresAt = moment().add("1", "days")
      } else {
        // encrypt password logic
        expiresAt = expiresAt !== undefined ? moment().add(expiresAt, "seconds") : null
      }

      const link = {
        originalLink,
        isPasswordProtected,
        password,
        expiresAt,
        shortLink: shortId.generate()
      }

      const generatedLink = await Link.create(link)

      return res.status(200).json({ error: false, generatedLink })
    } catch (error) {
      return res.status(400).json({ error: true, reason: error.message })
    }
  }
}
