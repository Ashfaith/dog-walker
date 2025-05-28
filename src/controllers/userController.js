const models = require("../db/queries");

async function listAllUsers(req, res) {
  try {
    const users = await models.getAllUsernames();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function listUser(req, res) {
  try {
    const user = await models.getUserById([req.params.id]);
    if (user == null) {
      return res.status(404).json({ message: "Unable to find user" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "User not found" });
  }
}

async function createUser(req, res) {
  try {
    const user = await models.insertUsername(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error. Unable to create user" });
  }
}

module.exports = {
  listAllUsers,
  listUser,
  createUser,
};
