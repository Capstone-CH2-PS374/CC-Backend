const prisma = require("../config/db");

// Handler untuk mendapatkan semua pengguna
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await prisma.userData.findMany({
      skip: skip,
      take: limit,
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mendapatkan pengguna berdasarkan ID
const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.userData.findUnique({
      where: { id: userId },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk menambahkan pengguna baru
const createUser = async (req, res) => {
  const {
    userId,
    name,
    address,
    birthDate,
    jobs,
    highest_edu,
    type_organization,
    interest,
    phone,
  } = req.body;
  try {
    const createdUser = await prisma.userData.create({
      data: {
        userId,
        name,
        address,
        birthDate,
        jobs,
        highest_edu,
        type_organization,
        interest,
        phone,
      },
    });
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mengupdate pengguna berdasarkan ID
const updateUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, address, birthDate, jobs, highest_edu, interest, phone } =
    req.body;
  try {
    const user = await prisma.userData.update({
      where: { id: userId },
      data: { name, address, birthDate, jobs, highest_edu, interest, phone },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk menghapus pengguna berdasarkan ID
const deleteUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.userData.delete({
      where: { id: userId },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
