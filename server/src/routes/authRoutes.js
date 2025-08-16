const express = require("express");
const router = express.Router();
require("../config/passport");
const passport = require("passport");
const { check } = require("express-validator");

router.get("/test", (req, res) => {
  res.send("Auth route works");
});

router.post(
  "/login",
  passport.authenticate("local"),
  check("username").trim().isEmail().normalizeEmail({ all_lowercase: true }),
  (req, res) => {
    res.json({ success: true, user: req.user });
  }
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

router.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ success: true });
  });
});

module.exports = router;
