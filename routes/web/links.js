const moment = require("moment")
const Link = require("../../models/link")
const Visitor = require("../../models/visitor")

module.exports = {

  async redirectLink(req, res) {
    try {
      const {
        headers,
        ip,
        hostname: hostName
      } = req
      const { token } = req.params
      const link = await Link.findOne({ shortLink: token }).exec()

      // is expired
      if (!(link.isActive && moment().isBefore(link.expiresAt))) {
        // missed count tracker code here
        return res.status(404).render("linkExpired")
      }
      // is password protected
      if (link.isPasswordProtected) return res.redirect(`/p/${link.shortLink}`)

      // track code here
      const track = {
        _link: link._id,
        headers,
        ip,
        hostName
      }
      Visitor.create(track)

      return res.redirect(link.originalLink)
    } catch (error) {
      return res.status(400).json({ error: true, reason: error.message })
    }
  }
}
