// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { pegarTurmas } = require("../getMethod/pegarTurmas");
const { adicionarTurma } = require("../postMethod/adicionarTurma");
const { removerTurma } = require("../deleteMethod/deletarTurma");
const { atualizarTurma } = require("../putMethod/editTurma");
const { adicionarSolicitacoes } = require("../putMethod/adicionarSolicitacoes");
const { removerSolicitacoes } = require("../putMethod/removerSolicitacao");



// Rota para cadastrar ou atualizar o usuário
router.get("/pegarTurma", pegarTurmas);
router.post("/adicionarTurma", adicionarTurma);
router.delete(`/removerTurma/:id`, removerTurma);
router.put(`/removerSolicitacao`, removerSolicitacoes);
router.put(`/atualizarTurma/:id`, atualizarTurma );
router.put("/adicionarSolicitacao", adicionarSolicitacoes);

module.exports = router;
