const express = require("express");
const qrHandler = require("../controllers/qrcode.controller");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post("/qrcode/:eventId", upload.none(), qrHandler.createHash);
router.get("/qrcode", qrHandler.getAllQr);
router.get("/qrcode/:eventId", qrHandler.getQrEventId);

module.exports = router;
