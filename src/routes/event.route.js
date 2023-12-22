const express = require("express");
const eventHandler = require("../controllers/event.controller");
const multer = require("multer");
// const upload = multer();
const upload = multer({
  storage: multer.memoryStorage(),
});
const router = express.Router();

router.get("/events", eventHandler.getAllEvents);
router.get("/events/:eventId", eventHandler.getEventById);
router.post("/events", upload.single("photo"), eventHandler.createEvent);
router.put(
  "/events/:eventId",
  upload.single("photo"),
  eventHandler.updateEventById
);
router.delete("/events/:eventId", eventHandler.deleteEventById);

module.exports = router;
