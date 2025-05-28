const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.listAllUsers);

//Load user
router.get("/:id", controller.listUser);

//Create user
router.post("/:id", controller.createUser);

//Update user
router.patch("/:id", (req, res) => {});

//Delete user
router.delete("/:id", (req, res) => {
  req.params.id;
});

module.exports = router;
