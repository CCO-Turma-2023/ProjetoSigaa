// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const { pegarEventos } = require("../getMethod/pegarEventos");
const { salvarEvento } = require("../postMethod/salvarEvento");
const { editarEvento } = require("../putMethod/editEvento");
const { deletarEvento } = require("../deleteMethod/deletarEvento");

// Rota para cadastrar ou atualizar o usuário
router.get("/pegarEventos", pegarEventos);
router.post("/salvarEvento", salvarEvento);
router.put("/editarEvento", editarEvento);
router.delete("/deletarEvento", deletarEvento);

module.exports = router;
