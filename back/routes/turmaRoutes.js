// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { pegarTurmas } = require("../getMethod/pegarTurmas");
const { adicionarTurma } = require("../postMethod/adicionarTurma");
const { removerTurma } = require("../deleteMethod/deletarTurma");
const { atualizarTurma } = require("../putMethod/editTurma");


// Rota para cadastrar ou atualizar o usuário
router.get("/pegarTurma", pegarTurmas);
router.post("/adicionarTurma", adicionarTurma);
router.delete(`/removerTurma/:id`, removerTurma)
router.put(`/atualizarTurma/:id`, atualizarTurma )

module.exports = router;
