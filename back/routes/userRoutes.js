// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { cadastrarUsuario } = require("../postMethod/cadastro"); // Importa a lógica de cadastro
const { login } = require("../postMethod/login");
const { recuperarSenha } = require("../postMethod/recuperarSenha");

// Rota para cadastrar ou atualizar o usuário
router.post("/cadastro", cadastrarUsuario);
router.post("/login", login);
router.post("/esqueceu", recuperarSenha);

module.exports = router;
