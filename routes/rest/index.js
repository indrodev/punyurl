const express = require("express")
const router = express.Router()

const expressJwt = require("express-jwt")

const config = require("../../config")[process.env.NODE_ENV || "development"]

const checkJwt = expressJwt({ secret: config.secret }) // the JWT auth check middleware
const hasJwt = expressJwt({ secret: config.secret, credentialsRequired: false })

const login = require("./auth")
const signup = require("./auth/signup")
const forgotpassword = require("./auth/password")
const users = require("./users")
const links = require("./links")

/* User SignIn / SignUp / Forget password */
router.post("/login", login.post)
router.post("/signup", signup.post)
router.post("/forgotpassword", forgotpassword.startWorkflow)
router.post("/resetpassword", forgotpassword.resetPassword)

/* Link Routes */
router.post("/link", hasJwt, links.post)

/* Auth required Routes Below */
router.all("*", checkJwt)

/* User Routes */
router.get("/users", users.find)
router.get("/user/:id", users.get)
router.post("/user", users.post)
router.put("/user/:id", users.put)
router.delete("/user/:id", users.delete)

module.exports = router
