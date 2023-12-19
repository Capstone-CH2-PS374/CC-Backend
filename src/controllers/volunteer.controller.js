const prisma = require("../config/db");

const getAllVolunteers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const volunteer = await prisma.volunteer.findMany({
      skip: skip,
      take: limit,
    });

    res.json(volunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVolunteerByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const volunteer = await prisma.volunteer.findUnique({
      where: { userId: userId },
    });

    if (volunteer) {
      res.json(volunteer);
    } else {
      res.status(404).json({ error: "Volunteer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getVolunteerByEventId = async (req, res) => {
//   const eventId = req.params.eventId;
//   try {
//     const volunteer = await prisma.volunteer.findUnique({
//       where: { eventId: parseInt(eventId) },
//     });

//     if (volunteer) {
//       res.json(volunteer);
//     } else {
//       res.status(404).json({ error: "Volunteer not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const createVolunteer = async (req, res) => {
  const { userId, eventId, status } = req.body;
  try {
    const createdVolunteer = await prisma.volunteer.create({
      data: {
        userId,
        eventId: parseInt(eventId),
        status,
      },
    });
    res.status(201).json(createdVolunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateVolunteerByUserId = async (req, res) => {
  const userId = req.params.userId;
  const status = req.body;
  try {
    const findVolunteer = await prisma.volunteer.findUnique({
      where: { userId: userId },
    });

    if (findVolunteer) {
      const volunteer = await prisma.volunteer.update({
        where: { userId: userId },
        data: status,
      });

      res.json(volunteer);
    } else {
      res.status(404).json({ error: "Volunteer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteVolunteerByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    await prisma.volunteer.delete({
      where: { userId: userId },
    });
    res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllVolunteers,
  getVolunteerByUserId,
  //   getVolunteerByEventId,
  createVolunteer,
  updateVolunteerByUserId,
  deleteVolunteerByUserId,
};
