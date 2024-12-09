// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const { pegarEventos } = require("../getMethod/pegarEventos");
const { salvarEvento } = require("../postMethod/salvarEvento");

// Rota para cadastrar ou atualizar o usuário
router.get("/pegarEventos", pegarEventos);
router.post("/salvarEvento", salvarEvento);

module.exports = router;
