const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardController");
const { ensureAuthenticated } = require("../middleWare");

router.get("/weather", controller.fetchWeather);

router.post("/createPost", ensureAuthenticated, controller.submitPost);

router.get("/display-posts", ensureAuthenticated, controller.getPosts);

router.get("/get-user", ensureAuthenticated, controller.getUser);

router.get("/map/:z/:x/:y", controller.fetchMap);

module.exports = router;
