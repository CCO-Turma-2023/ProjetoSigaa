// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { pegarTurmas } = require("../getMethod/pegarTurmas");
const { adicionarTurma } = require("../postMethod/adicionarTurma");

// Rota para cadastrar ou atualizar o usuário
router.get("/pegarTurma", pegarTurmas);
router.post("/adicionarTurma", adicionarTurma);

module.exports = router;
