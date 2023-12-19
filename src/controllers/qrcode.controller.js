const prisma = require("../config/db");
const crypto = require("crypto");

const createHash = async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  try {
    const event = await prisma.Event.findFirst({
      where: { eventId: eventId },
    });

    const startDate = event.start;
    const startDateString = startDate.toISOString().split("T")[0];
    const date = startDateString.replace(/-/g, "");
    const dataHash = eventId.toString() + date;

    const hash = crypto.createHash("sha256").update(dataHash).digest("hex");

    const qrcode = await prisma.QRCode.create({
      data: { qrhash: hash, date: startDate, eventId },
    });

    res.status(201).json(qrcode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllQr = async (req, res) => {
  try {
    const qrcode = await prisma.QRCode.findMany();
    res.json(qrcode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQrEventId = async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  try {
    const qrcode = await prisma.QRCode.findFirst({
      where: {
        eventId: eventId,
      },
    });

    if (qrcode) {
      res.json(qrcode);
    } else {
      res.status(404).json({ error: "QRCode not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createHash,
  getAllQr,
  getQrEventId,
};
