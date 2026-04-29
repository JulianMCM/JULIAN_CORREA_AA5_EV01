const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// =======================
// REGISTRO DE USUARIO
// =======================
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificamos si el usuario ya existe
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Creamos nuevo usuario
    user = new User({
      username,
      password
    });

    // Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardamos en la base de datos
    await user.save();

    res.json({ msg: "Usuario registrado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// =======================
// LOGIN DE USUARIO
// =======================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscamos el usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Error en la autenticación" });
    }

    // Comparamos contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Error en la autenticación" });
    }

    // Si todo es correcto
    res.json({ msg: "Autenticación satisfactoria" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;