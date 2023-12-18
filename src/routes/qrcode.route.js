const express = require("express");
const qrHandler = require("../controllers/qrcode.controller");

const router = express.Router();

router.post("/qrcode", qrHandler.createHash);
router.get("/qrcode", qrHandler.getAllQr);
router.get("/qrcode/:eventId", qrHandler.getQrEventId);

module.exports = router;
