const mongoose = require("mongoose");

// Definimos el esquema del usuario
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true // elimina espacios
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true // crea createdAt y updatedAt
});
// Exportamos el modelo
module.exports = mongoose.model("User", UserSchema);