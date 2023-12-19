const express = require("express");
const userHandler = require("../controllers/user.controller");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.get("/users", userHandler.getAllUsers);
router.get("/users/:userId", userHandler.getUserById);
router.post("/users", upload.none(), userHandler.createUser);
router.put("/users/:userId", upload.none(), userHandler.updateUserById);
router.patch("/users/:userId", upload.none(), userHandler.updateUserById);
router.delete("/users/:userId", userHandler.deleteUserById);

module.exports = router;
