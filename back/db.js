// db.js
const mysql = require("mysql2/promise");
const {
  createDatabaseSQL,
  createCursosTableSQL,
  createUsersTableSQL,
  createTurmasTableSQL,
  createCalendarioTableSQL,
  insertCursosSQL,
  insertUsersSQL,
  insertTurmasSQL,
  insertCalendarioSQL
} = require("./bd/bd"); // Importando as queries do arquivo bd.js

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Coloque sua senha aqui
  database: "bdusers", // Inicializa com um banco qualquer (no caso, "bdusers")
});

// Função para inicializar o banco de dados
async function initializeDatabase() {
  const connection = await pool.getConnection();
  try {
    // Cria o banco de dados se não existir
    await connection.query(createDatabaseSQL);
    console.log("Banco de dados criado ou já existente.");

    // Após criar o banco, usa o banco correto
    await connection.query("USE `bdusers`;");

    // Cria a tabela cursos
    await connection.query(createCursosTableSQL);
    console.log("Tabela cursos criada.");

     // Insere os dados na tabela cursos
    await connection.query(insertCursosSQL);

    // Cria a tabela users
    await connection.query(createUsersTableSQL);
    console.log("Tabela users criada.");

    //Inserir na tabela Users 
    await connection.query(insertUsersSQL);

     // Cria a tabela turmas
    await connection.query(createTurmasTableSQL);
    console.log("Tabela turmas criada.");
 
     //Inserir na tabela turmas 
    await connection.query(insertTurmasSQL);

      // Cria a tabela calendario
    await connection.query(createCalendarioTableSQL);
    console.log("Tabela calendário criada.");
  
      //Inserir na tabela calendario 
    await connection.query(insertCalendarioSQL);
   
    console.log("Dados inseridos no Banco.");
  } catch (error) {
    console.error("Erro ao configurar o banco de dados:", error);
  } finally {
    connection.release();
  }
}

// Inicializa o banco ao iniciar o servidor
initializeDatabase();

module.exports = pool;
