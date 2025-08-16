const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardController");
const { ensureAuthenticated } = require("../middleWare");
const { check } = require("express-validator");

router.get("/weather", controller.fetchWeather);

router.post(
  "/createPost",
  ensureAuthenticated,
  check("title").notEmpty().trim().withMessage("Title required").escape(),
  controller.submitPost
);

router.get("/display-posts", ensureAuthenticated, controller.getPosts);

router.get("/get-user", ensureAuthenticated, controller.getUser);

router.get("/map/:z/:x/:y", controller.fetchMap);

module.exports = router;
