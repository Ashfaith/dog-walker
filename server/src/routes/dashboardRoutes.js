const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardController");
const models = require("../db/models");

router.get("/weather", controller.fetchWeather);

module.exports = router;
