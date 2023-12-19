const prisma = require("../config/db");

// Handler untuk membuat Category baru
const createCategory = async (req, res) => {
  const category = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: {
        category,
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mendapatkan semua Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mendapatkan Category berdasarkan ID
const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await prisma.category.findUnique({
      where: { categoryId: parseInt(categoryId) },
    });

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk memperbarui Category berdasarkan ID
const updateCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = req.body;

  try {
    const findCategory = await prisma.category.findUnique({
      where: { categoryId: parseInt(categoryId) },
    });

    if (findCategory) {
      const updatedCategory = await prisma.category.update({
        where: { categoryId: parseInt(categoryId) },
        data: {
          category,
        },
      });

      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk menghapus Category berdasarkan ID
const deleteCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    await prisma.category.delete({
      where: { categoryId: parseInt(categoryId) },
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
