const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardController");

router.get("/weather", controller.fetchWeather);

router.post("/createPost", controller.submitPost);

router.get("/display-posts", controller.getPosts);

router.get("/map/:z/:x/:y", controller.fetchMap);

module.exports = router;
