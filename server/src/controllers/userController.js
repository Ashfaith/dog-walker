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

async function createUser(req, res) {
  try {
    const { name, pw } = req.body;
    const user = await models.insertUser(name, pw);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const user = req.user;
  try {
    const deleted = await models.deleteUserByName(user.name);
    if (deleted.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    }
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function editUser(req, res) {
  const user = req.user;
  if (req.body.name !== null) {
    req.user.name = req.body.name;
  }
  try {
    const updatedUser = await models.updateUser(req.user.name, user.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  listAllUsers,
  deleteUser,
  createUser,
  editUser,
};
