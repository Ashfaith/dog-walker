const models = require("../db/models");

async function sendFollowerRequest(req, res) {
  try {
    let { uid1, uid2, status } = req.body;
    const request = await models.sendFollowRequest(uid1, uid2, status);
    res.json(request);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Already following!" });
    }
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  sendFollowerRequest,
};
