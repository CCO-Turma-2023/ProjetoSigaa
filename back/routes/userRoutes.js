// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { cadastrarUsuario } = require("../postMethod/cadastro"); // Importa a lógica de cadastro
const { login } = require("../postMethod/login");
const { recuperarSenha } = require("../postMethod/recuperarSenha");
//const {autenticaUsuario} = require("../getMethod/autenticaUsuario")
const {autenticarToken} = require("../auth/auth.js")

// Rota para cadastrar ou atualizar o usuário
router.post("/cadastro", cadastrarUsuario);
router.post("/login", login);
router.post("/esqueceu", recuperarSenha);
router.get("/autentica", autenticarToken);


module.exports = router;
