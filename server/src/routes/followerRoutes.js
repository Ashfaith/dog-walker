const express = require("express");
const router = express.Router();
const controller = require("../controllers/followerController");

router.post("/request", controller.sendFollowerRequest);

router.get("/view-requests", controller.viewFollowRequests);

router.get("/all-followers", controller.allFollowers);

router.patch("/action-request", controller.actionRequest);

module.exports = router;
