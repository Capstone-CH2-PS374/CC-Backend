const prisma = require("../config/db");

// Handler untuk mendapatkan semua event
const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const events = await prisma.event.findMany({
      skip: skip,
      take: limit,
    });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mendapatkan event berdasarkan ID
const getEventById = async (req, res) => {
  const eventId = parseInt(req.params.id);
  try {
    const event = await prisma.event.findUnique({
      where: { eventId: eventId },
    });

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk menambahkan event baru
const createEvent = async (req, res) => {
  const {
    name,
    start,
    end,
    location,
    type,
    description,
    categoryId,
    registerDate,
  } = req.body;

  try {
    const createdEvent = await prisma.event.create({
      data: {
        name,
        start,
        end,
        location,
        type,
        description,
        categoryId,
        registerDate,
      },
    });
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mengupdate event berdasarkan ID
const updateEventById = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const updatedEvent = req.body;
  try {
    const event = await prisma.event.update({
      where: { eventId: eventId },
      data: updatedEvent,
    });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk menghapus event berdasarkan ID
const deleteEventById = async (req, res) => {
  const eventId = parseInt(req.params.id);
  try {
    await prisma.event.delete({
      where: { eventId: eventId },
    });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
};
