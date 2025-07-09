const { response } = require("express");
const models = require("../db/models");

async function sendFollowerRequest(req, res) {
  try {
    const uid2 = req.body;
    const uid1 = req.user;
    const status = "REQ";
    const request = await models.sendFollowRequest(uid1.id, uid2, status);
    res.json(request);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Already following!" });
    }
    res.status(500).json({ message: err.message });
  }
}

async function viewFollowRequests(req, res) {
  const user = req.user;
  try {
    const followReqs = await models.retrieveFollowRequest(user.id);
    res.json(followReqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function actionRequest(req, res) {
  const user = req.user;
  const { action, follower } = req.body;
  if (action) {
    try {
      const allow = await models.approveFollow(user.id, follower);
      res.json(allow);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const reject = await models.rejectFollow(user.id, follower);
      res.json(reject);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

async function allFollowers(req, res) {
  const user = req.user;
  try {
    await models.retrieveAllFollowers(user.id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  sendFollowerRequest,
  viewFollowRequests,
  actionRequest,
  allFollowers,
};
