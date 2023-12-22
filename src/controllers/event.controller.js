const prisma = require("../config/db");
const { Storage } = require("@google-cloud/storage");
// const multer = require("multer");
const path = require("path");

const storage = new Storage({
  projectId: "capstone-ch2-ps374",
  keyFilename: path.join(
    __dirname,
    "../../key/capstone-ch2-ps374-bc127f18f6bb.json"
  ),
});

const bucketName = "ch2ps374_image_bucket";

// Fungsi untuk mengambil gambar dari bucket
// const getImageFromBucket = async (filename) => {
//   const file = storage.bucket(bucketName).file(filename);

//   const [exists] = await file.exists();

//   if (!exists) {
//     throw new Error("Image not found");
//   }

//   return file.createReadStream();
// };

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

    // Menambahkan URL gambar ke setiap event
    // const eventsWithImages = await Promise.all(
    //   events.map(async (event) => {
    //     try {
    //       const imageUrl = `https://storage.googleapis.com/${bucketName}/${event.photo}`;
    //       const imageStream = await getImageFromBucket(event.photo);
    //       return event;
    //     } catch (error) {
    //       console.error(error);
    //       return event;
    //     }
    //   })
    // );

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mendapatkan event berdasarkan ID
const getEventById = async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  try {
    const event = await prisma.event.findUnique({
      where: { eventId: eventId },
    });

    if (event) {
      // Menambahkan URL gambar ke event
      // const imageStream = await getImageFromBucket(event.photo);
      // event.imageUrl = `https://storage.googleapis.com/${bucketName}/${event.photo}`;

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
    organizationId,
  } = req.body;

  try {
    // Pastikan bahwa req.file adalah objek file yang dikirimkan melalui formulir
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    // Menentukan nama file yang akan disimpan di Google Cloud Storage
    const filename = Date.now() + "-" + req.file.originalname;
    const file = storage.bucket(bucketName).file(filename);

    // Menyimpan file di Google Cloud Storage
    await file.save(req.file.buffer);

    const createdEvent = await prisma.event.create({
      data: {
        name,
        start,
        end,
        location,
        type,
        description,
        categoryId: parseInt(categoryId),
        registerDate,
        organizationId,
        // Menambahkan informasi file ke objek event yang akan disimpan di database
        photo: filename,
      },
    });

    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk mengupdate event berdasarkan ID
// const updateEventById = async (req, res) => {
//   const eventId = parseInt(req.params.eventId);
//   const { name, start, end, location, type, description } = req.body;
//   try {
//     const findEvent = await prisma.event.findUnique({
//       where: { eventId: eventId },
//     });

//     if (findEvent) {
//       const event = await prisma.event.update({
//         where: { eventId: eventId },
//         data: { name, start, end, location, type, description },
//       });
//       res.json(event);
//     } else {
//       res.status(404).json({ error: "Event not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const updateEventById = async (req, res) => {
  const eventId = req.params.id; // Ambil ID acara dari parameter URL
  const {
    name,
    start,
    end,
    location,
    type,
    description,
    categoryId,
    registerDate,
    organizationId,
  } = req.body;

  try {
    // Pastikan bahwa req.file adalah objek file yang dikirimkan melalui formulir
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    // Menentukan nama file yang akan disimpan di Google Cloud Storage
    const filename = Date.now() + "-" + req.file.originalname;
    const file = storage.bucket(bucketName).file(filename);

    // Menyimpan file di Google Cloud Storage
    await file.save(req.file.buffer);

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(eventId) },
      data: {
        name,
        start,
        end,
        location,
        type,
        description,
        categoryId: parseInt(categoryId),
        registerDate,
        organizationId,
        // Menambahkan informasi file ke objek event yang akan disimpan di database
        photo: filename,
      },
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler untuk menghapus event berdasarkan ID
const deleteEventById = async (req, res) => {
  const eventId = parseInt(req.params.eventId);
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
