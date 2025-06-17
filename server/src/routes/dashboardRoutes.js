const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardController");
const models = require("../db/models");

router.get("/weather", controller.fetchWeather);

router.post("/createPost", controller.submitPost); // Create a way to assign user Id to session.

module.exports = router;
