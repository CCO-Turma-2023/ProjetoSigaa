// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { cadastrarUsuario } = require("../postMethod/cadastro"); // Importa a lógica de cadastro
const { login } = require("../postMethod/login");

// Rota para cadastrar ou atualizar o usuário
router.post("/cadastro", cadastrarUsuario);
router.post("/login", login);

module.exports = router;
