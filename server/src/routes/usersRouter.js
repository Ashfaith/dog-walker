const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const models = require("../db/models");
const { validateCreate, ensureAuthenticated } = require("../middleWare");

//user searches
router.get("/users-by-name", ensureAuthenticated, controller.usersByName);

router.get("/users-by-email", ensureAuthenticated, controller.usersByEmail);

//Create user
router.post("/createUser", validateCreate, controller.createUser);

//Load user
router.get("/:id", ensureAuthenticated, getUser, (req, res) => {
  const user = req.user;
  res.json(user);
});

//Update user
router.patch("/:id", ensureAuthenticated, getUser, controller.editUserName);

//Delete user
router.delete("/:id", ensureAuthenticated, getUser, controller.deleteUser);

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
