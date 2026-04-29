const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Inicializamos la app
const app = express();

// Conectamos a MongoDB
connectDB();

// Middleware
app.use(cors()); // Permite conexiones externas
app.use(express.json()); // Permite recibir JSON

// Rutas
app.use("/api/auth", require("./routes/auth"));

// Puerto
const PORT = 3000;

// Iniciamos servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});