// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { pegarTurmas } = require("../getMethod/pegarTurmas");

// Rota para cadastrar ou atualizar o usuário
router.get("/pegarTurma", pegarTurmas);

module.exports = router;
