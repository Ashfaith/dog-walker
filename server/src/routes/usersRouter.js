const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const models = require("../db/models");

//user searches
router.get("/users-by-name", controller.usersByName);

router.get("/users-by-email", controller.usersByEmail);

//Create user
router.post("/createUser", controller.createUser);

//Change password
router.patch("/passwordUpdate/:id", getUser, controller.updatePassword);

router.get("/", controller.listAllUsers);

//Load user
router.get("/:id", getUser, (req, res) => {
  const user = req.user;
  res.json(user);
});

//Update user
router.patch("/:id", getUser, controller.editUser);

//Delete user
router.delete("/:id", getUser, controller.deleteUser);

async function getUser(req, res, next) {
  let user;
  try {
    user = await models.getUserById(req.params.id);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "Unable to find user" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
