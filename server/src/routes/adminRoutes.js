const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");

//Change password
router.patch("/passwordUpdate", controller.changeUserPassword);

module.exports = router;
