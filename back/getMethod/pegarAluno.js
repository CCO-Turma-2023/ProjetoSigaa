const pool = require("../db");

const pegarAluno = async (req, res) => {
  const { solicitacoes } = req.headers;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE matricula IN (?)",
      [solicitacoes.split(",")]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.status(200).json({ alunos: rows });
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { pegarAluno };
