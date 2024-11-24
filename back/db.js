// db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bdUsers",
});

// Testa a conexão com o banco na inicialização
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida!");
    connection.release(); // Libera a conexão de volta para o pool
  }
});

module.exports = pool;
