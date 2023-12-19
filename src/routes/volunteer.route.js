const express = require("express");
const volunteerHandler = require("../controllers/volunteer.controller");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.get("/volunteers", volunteerHandler.getAllVolunteers);
router.get("/volunteers/:userId", volunteerHandler.getVolunteerByUserId);
// router.get("/volunteers/:eventId", volunteerHandler.getVolunteerByEventId);
router.post("/volunteers", upload.none(), volunteerHandler.createVolunteer);
router.put(
  "/volunteers/:userId",
  upload.none(),
  volunteerHandler.updateVolunteerByUserId
);
router.delete("/volunteers/:userId", volunteerHandler.deleteVolunteerByUserId);

module.exports = router;
