// Importamos mongoose para conectarnos a MongoDB
const mongoose = require("mongoose");

// Función para conectar la base de datos
const connectDB = async () => {
  try {
    // Conexión local (puedes cambiar por Mongo Atlas)
    await mongoose.connect("mongodb://127.0.0.1:27017/loginDB");

    console.log("MongoDB conectado");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;