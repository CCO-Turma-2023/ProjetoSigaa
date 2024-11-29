// index.js
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Importa as rotas

const app = express();

// Configuração de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir apenas o front-end em localhost:5173
    methods: ["GET", "POST"], // Permitir apenas certos métodos HTTP
  })
);



// Middleware para processar o corpo das requisições como JSON
app.use(express.json());


// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Usando as rotas de usuários
app.use("/users", userRoutes); // Chama as rotas de cadastro

// Inicia o servidor
const PORT = 3200;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = { app };
