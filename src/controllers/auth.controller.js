const prisma = require("../config/db");
// const firebaseAdmin = require("firebase-admin");

const register = async (req, res, role) => {
  const { userId } = req.body;

  try {
    // * Cek apakah pengguna dengan UUID tersebut sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this UUID already exists" });
    }

    // const roleInfo = await prisma.role.findUnique({
    //   where: { role },
    // });

    // if (!roleInfo) {
    //   return res.status(400).json({ error: "Invalid role specified" });
    // }

    // Registrasi pengguna di PostgreSQL
    const createdUser = await prisma.user.create({
      data: {
        userId,
        role,
      },
    });

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Internal server error during ${role} registration` });
  }
};

const login = async (req, res, role) => {
  const { userId } = req.body;

  try {
    const entity = role === "User" ? "User" : "Organization";

    // Cari pengguna di PostgreSQL berdasarkan UUID
    const result = await prisma[entity].findUnique({
      where: { userId },
      include: {
        role: true,
      },
    });

    if (result) {
      res.json({ [entity]: result, role });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Internal server error during ${role} login` });
  }
};

module.exports = {
  register,
  login,
};
