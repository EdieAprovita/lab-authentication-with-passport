const router = require("express").Router()
const User = require("../models/User")
const passport = require("../config/passport")

router.get("/signup" , (req, res, next) => {
  const config = {
    title: "Sign up",
    action: "/signup",
    button: "Sign up",
    register: true 
  }
  res.render("passport/form", config)
})

router.post("signup", async (req, res, next) => {
  try {
    const user = await User.register({...req.body}, req.body.password)
    console.log(user)
    res.redirect("/login")
  } catch (e) {
    console.log(e)
    res.send("El usuario ya existe")
  }
})

router.get("/login" , (req, res, next )=> {
  const config = {
    title: "Login",
    action: "/login",
    button: "Log In"
  }
  res.render("passport/form", config)
})

router.post("/login", passport.authenticate("local") , (req, res, next) => {
  console.log(req.user, req.session)
  res.redirect("/profile")
}) 



module.exports = router