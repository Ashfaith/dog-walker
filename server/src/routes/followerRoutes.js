const express = require("express");
const router = express.Router();
const controller = require("../controllers/followerController");
const models = require("../db/models");

router.post("/request", controller.sendFollowerRequest);

// router.get("/fetch-requests", controller.fetchRequests);

// router.get("/friends", controller.allFriends);

// router.post("/action-request", controller.actionRequest);

module.exports = router;
