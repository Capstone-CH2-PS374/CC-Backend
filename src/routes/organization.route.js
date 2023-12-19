const express = require("express");
const organizationHandler = require("../controllers/organization.controller");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post(
  "/organizations",
  upload.none(),
  organizationHandler.createOrganization
);
router.get("/organizations/:userId", organizationHandler.getOrganizationById);
router.get("/organizations", organizationHandler.getAllOrganizations);
router.put(
  "/organizations/:userId",
  upload.none(),
  organizationHandler.updateOrganizationById
);
router.delete(
  "/organizations/:userId",
  organizationHandler.deleteOrganizationById
);

module.exports = router;
