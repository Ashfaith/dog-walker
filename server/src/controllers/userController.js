const models = require("../db/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

async function createUser(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { firstName, lastName, email, pw } = req.body;
    const hashedPassword = await bcrypt.hash(pw, 10);
    const user = await models.insertUser(
      firstName,
      lastName,
      email,
      hashedPassword
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const user = req.user;
  try {
    const deleted = await models.deleteUserById(user.id);
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

async function editUserName(req, res) {
  const user = req.user;
  if (req.body.name !== null) {
    req.user.name = req.body.name;
  }
  try {
    const updatedUser = await models.updateUserName(req.user.name, user.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updatePassword(req, res) {
  const user = req.user;
  if (req.body.name !== null) {
    req.user.name = req.body.name;
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.pw, 10);
    const updatedUser = await models.updatePassword(hashedPassword, user.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function usersByName(req, res) {
  const { name } = req.query;
  const id = req.user.id;
  try {
    const foundUsers = await models.getUsersByName(name, id);
    res.json(foundUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function usersByEmail(req, res) {
  const { email } = req.query;
  const id = req.user.id;
  try {
    const foundUsers = await models.getUsersByEmail(email, id);
    res.json(foundUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  deleteUser,
  createUser,
  editUserName,
  updatePassword,
  usersByEmail,
  usersByName,
};
