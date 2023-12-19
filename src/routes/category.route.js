const express = require("express");
const categoryHandler = require("../controllers/category.controller");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post("/categories", upload.none(), categoryHandler.createCategory);
router.get("/categories", categoryHandler.getAllCategories);
router.get("/categories/:categoryId", categoryHandler.getCategoryById);
router.put(
  "/categories/:categoryId",
  upload.none(),
  categoryHandler.updateCategoryById
);
router.delete("/categories/:categoryId", categoryHandler.deleteCategoryById);

module.exports = router;
