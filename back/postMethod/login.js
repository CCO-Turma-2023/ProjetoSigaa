const pool = require("../db");

const jwt = require("jsonwebtoken");

const key = "1234";

const login = async (req, res) => {
  try {
    const { matricula, senha } = req.body;

    // Usar await com o pool configurado para Promises
    const [rows] = await pool.query("SELECT * FROM users WHERE matricula = ?", [
      matricula,
    ]);

    // Verificar se o usuário existe
    if (rows.length === 0) {
      return res.status(404).send("Usuário não encontrado");
    }

    const user = rows[0]; // Pegar o primeiro (e único) resultado

    console.log(user);

    // Validar a senha
    if (user.senha === senha) {
      const dados = {
        id: user.id,
        name: user.name,
        email: user.email,
        matricula: user.matricula,
      };
      const token = jwt.sign(dados, key, { expiresIn: "1h" });
      console.log("Login realizado com sucesso");
      return res.status(200).json({ token });
    } else {
      console.log("Senha incorreta");
      return res.status(401).send("Login ou senha errado");
    }
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error.message);
    return res.status(500).send("Erro ao consultar o banco de dados");
  }
};

module.exports = { login, key };
