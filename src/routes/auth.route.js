const express = require("express");
const authHandler = require("../controllers/auth.controller");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post("/register", upload.none(), authHandler.register);
router.get("/register", authHandler.getUsers);
router.post("/login", upload.none(), authHandler.login);

module.exports = router;
