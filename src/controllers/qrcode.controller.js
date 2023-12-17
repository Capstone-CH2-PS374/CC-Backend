const prisma = require("../config/db");
const QRCode = require("qrcode");
const crypto = require("crypto");
const fs = require("fs/promises");

// Function to generate a unique hash based on the current date
function generateUniqueHash() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const hash = crypto.createHash("sha256").update(today).digest("hex"); // Hash the date
  return hash;
}

// Function to generate QR code with a specific size
async function generateQRCode(data, size) {
  try {
    // Generate QR code image from data
    const qrCodeImage = await QRCode.toFile(`qr_${data}.png`, data, {
      width: size,
      height: size,
    });

    console.log(`QR Code generated: qr_${data}.png`);
    return `qr_${data}.png`;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}

// Function to save QR code data to the database
async function saveQRCodeToDatabase(hash, imageUrl) {
  try {
    const savedQRCode = await prisma.qRCode.create({
      data: {
        hash,
        imageUrl,
      },
    });

    console.log("QR Code data saved to database:", savedQRCode);
  } catch (error) {
    console.error("Error saving QR code data to database:", error);
    throw error;
  }
}

// Generate a unique hash for today's date
const uniqueHash = generateUniqueHash();

// Generate QR code with the unique hash and size 512x512
generateQRCode(uniqueHash, 512)
  .then(async (imagePath) => {
    // Save QR code image path to the database using Prisma
    await saveQRCodeToDatabase(uniqueHash, imagePath);
  })
  .catch(async (error) => {
    console.error("Error generating and saving QR code:", error);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Close the database connection
  });

module.exports = {
  generateQRCode,
};
