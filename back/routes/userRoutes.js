// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { cadastrarUsuario } = require("../postMethod/cadastro"); // Importa a lógica de cadastro
const { login } = require("../postMethod/login");
const { recuperarSenha } = require("../postMethod/recuperarSenha");
const { autenticarToken } = require("../auth/auth.js");
const { pegarCurso } = require("../getMethod/pegarCurso.js");
const { mudarSenha } = require("../postMethod/mudarSenha");
const { pegarSolicitacoes } = require("../getMethod/pegarSolicitacoes");
const { pegarAluno } = require("../getMethod/pegarAluno");

// Rota para cadastrar ou atualizar o usuário
router.post("/cadastro", cadastrarUsuario);
router.post("/login", login);
router.post("/esqueceu", recuperarSenha);
router.get("/autentica", autenticarToken);
router.get("/pegarCurso", pegarCurso);
router.post("/mudarSenha", mudarSenha);
router.get("/pegarSolicitacoes", pegarSolicitacoes)
router.get("/pegarAluno", pegarAluno)

module.exports = router;
