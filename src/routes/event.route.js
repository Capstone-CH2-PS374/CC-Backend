const express = require("express");
const eventHandler = require("../controllers/event.controller");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.get("/events", eventHandler.getAllEvents);
router.get("/events/:eventId", eventHandler.getEventById);
router.post("/events", upload.none(), eventHandler.createEvent);
router.put("/events/:eventId", upload.none(), eventHandler.updateEventById);
router.delete("/events/:eventId", eventHandler.deleteEventById);

module.exports = router;
