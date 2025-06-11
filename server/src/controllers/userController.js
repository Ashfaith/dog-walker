const { response } = require("express");
const models = require("../db/models");
const bcrypt = require("bcryptjs");

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
    const { name, email, pw } = req.body;
    const hashedPassword = await bcrypt.hash(pw, 10);
    const user = await models.insertUser(name, email, hashedPassword);
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

async function updatePassword(req, res) {
  const user = req.user;
  if (req.body.name !== null) {
    req.user.name = req.body.name;
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.pw, 10);
    const updatedUser = await models.updatePassword(hashedPassword, user.id);
    res.json(updatedUser);
    // res.redirect("/");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  listAllUsers,
  deleteUser,
  createUser,
  editUser,
  updatePassword,
};
