const prisma = require("../config/db");
const crypto = require("crypto");

// Function to generate a unique hash based on the current date
const generateUniqueHash = async (req, res) => {
  // const eventId = parseInt(req.params.id);
  let eventId = 1;
  try {
    const event = await prisma.Event.findFirst({
      where: { eventId },
    });

    const startDate = event.start;
    const startDateString = startDate.toISOString().split("T")[0];
    const date = startDateString.replace(/-/g, "");
    const dataHash = eventId.toString() + date;

    const hash = crypto.createHash("sha256").update(dataHash).digest("hex"); // Hash the date

    return hash;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Generate a unique hash for today's date

const createHash = async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await prisma.Event.findFirst({
      where: { eventId },
    });

    const startDate = event.start;
    const uniqueHash = generateUniqueHash();

    // console.log(uniqueHash.toString());

    const qrcode = await prisma.QRCode.create({
      data: { qrhash: uniqueHash, date: startDate, eventId },
    });

    res.status(201).json(qrcode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createHash,
};
