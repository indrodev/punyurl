const moment = require("moment")
const Link = require("../../models/link")

module.exports = {

  async redirectLink(req, res) {
    try {
      const { token } = req.params
      const link = await Link.findOne({ shortLink: token }).exec()

      // is expired
      if (!(link.isActive && moment().isBefore(link.expiresAt))) return res.status(404).render("linkExpired")
      // is password protected
      if (link.isPasswordProtected) return res.redirect(`/p/${link.shortLink}`)

      return res.redirect(link.originalLink)
    } catch (error) {
      return res.status(400).json({ error: true, reason: error.message })
    }
  }
}
