const models = require("../db/models");
const bcrypt = require("bcryptjs");

async function changeUserPassword(req, res) {
  try {
    const { userId, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await models.updatePassword(userId, hashedPassword);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function listAllUsers(req, res) {
  try {
    const users = await models.getAllUsernames();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  changeUserPassword,
  listAllUsers,
};
