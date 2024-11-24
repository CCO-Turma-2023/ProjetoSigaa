const pool = require("../db"); // Importa o pool de conexões do banco de dados

// Função para cadastrar ou atualizar um usuário
const login = (req, res) => {
  console.log("chegou aq");
  res.send("teste");
};

module.exports = { login };
