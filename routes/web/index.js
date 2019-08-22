const express = require("express")
const router = express.Router()

const User = require("../../models/user")
const links = require("../web/links")

/* All Web routes below */

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

router.get("/p/:token", (req, res) => res.render("passwordRedirectForm"))
router.get("/:token", links.redirectLink)

module.exports = router
