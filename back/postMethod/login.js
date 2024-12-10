const pool = require("../db");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { matricula, senha } = req.body;

    if(matricula === "" || senha === ""){
      return res.status(200).json({ status: false, message: "Campo Vazio"});
    }

    // Usar await com o pool configurado para Promises
    const [rows] = await pool.query("SELECT * FROM users WHERE matricula = ?", [
      matricula,
    ]);

    // Verificar se o usuário existe
    if (rows.length === 0) {
      return res.status(200).json({ status: false, message: "Usuário ou senha incorretos"});
    }

    const user = rows[0]; // Pegar o primeiro (e único) resultado

    // Validar a senha
    if (user.senha === senha) {
      const dados = {
        id: user.id,
        name: user.name,
        email: user.email,
        matricula: user.matricula,
        curso: user.curso,
        type: user.type,
        turmasDef: user.turmasDef,
        turmasIn: user.turmasIn,
        solicitacoes: user.solicitacoes,
      };

      const token = jwt.sign(dados, process.env.TOKEN, { expiresIn: "30m" }); // Gera TOKEM

      return res.status(200).json({ token, status: true });
    } else {
      return res.status(200).json({ status: false, message: "Usuário ou senha incorretos"});
    }
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error.message);
    return res.status(500).send("Erro ao consultar o banco de dados");
  }
};

module.exports = { login };
