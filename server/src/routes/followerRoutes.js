const express = require("express");
const router = express.Router();
const controller = require("../controllers/followerController");

router.post("/request", controller.sendFollowerRequest);

router.get("/view-requests", controller.viewFollowRequests);

router.get("/followers", controller.allFollowers);

router.post("/action-request", controller.actionRequest);

module.exports = router;
