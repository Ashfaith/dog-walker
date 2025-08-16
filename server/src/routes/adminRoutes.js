const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");

//Change password
router.patch("/passwordUpdate", controller.changeUserPassword);

router.get("/listUsers", controller.listAllUsers);

module.exports = router;
