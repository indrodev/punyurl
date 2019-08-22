const express = require("express")
const router = express.Router()

const User = require("../../models/user")
const Link = require("../../models/link")


/* GET home page. */
router.get("/", (req, res) => res.render("index", { title: "PunyURL" }))

router.get("/resetpassword/:token", async (req, res) => {
  try {
    const { token } = req.params
    const now = new Date()
    const user = await User
      .findOne({
        isActive: true,
        "forgotpassword.token": token,
        "forgotpassword.expiresAt": { $gte: now },
      })
      .select("email")
      .lean()
      .exec()
    if (user === null) throw new Error("INVALID OR EXPIRED LINK")
    return res.render("resetpassword", { handle: user.email, token })
  } catch (error) {
    return res.status(500).send(error.message)
  }
})


router.get("/:token", async (req, res) => {
  try {
    const { token } = req.params
    const link = await Link.findOne({ shortLink: token }).exec()
    return res.status(302).redirect(link.originalLink)
  } catch (error) {
    return res.status(400).json({ error: true, reason: error.message })
  }
})

module.exports = router
