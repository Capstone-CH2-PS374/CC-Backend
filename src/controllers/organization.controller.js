const prisma = require("../config/db");

// Handler untuk membuat organisasi baru
const createOrganization = async (req, res) => {
  const { userId, name, address, eventId } = req.body;

  try {
    const organization = await prisma.organization.create({
      data: {
        userId,
        name,
        address,
        eventId,
      },
    });

    res.status(201).json(organization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mencari organisasi berdasarkan userId
const getOrganizationById = async (req, res) => {
  const { userId } = req.params;

  try {
    const organization = await prisma.organization.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (organization) {
      res.json(organization);
    } else {
      res
        .status(404)
        .json({ error: "Organization not found for the given userId" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mendapatkan semua organisasi
const getAllOrganizations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const organizations = await prisma.organization.findMany({
      skip: skip,
      take: limit,
    });
    res.json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk memperbarui Organization berdasarkan ID
const updateOrganizationById = async (req, res) => {
  const { userId } = req.params;
  const { name, address, eventId } = req.body;

  try {
    const updatedOrganization = await prisma.organization.update({
      where: { userId: parseInt(userId) },
      data: {
        userId,
        name,
        address,
        eventId,
      },
    });

    res.json(updatedOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk menghapus Organization berdasarkan ID
const deleteOrganizationById = async (req, res) => {
  const { userId } = req.params;

  try {
    await prisma.organization.delete({
      where: { userId: parseInt(userId) },
    });

    res.json({ message: "Organization deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrganization,
  getOrganizationById,
  getAllOrganizations,
  updateOrganizationById,
  deleteOrganizationById,
};
