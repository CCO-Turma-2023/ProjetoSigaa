const pool = require("../db");

const removerSolicitacoes = async (req, res) => {
  const { matricula, id } = req.body;

  const queryTurma = `
      UPDATE turmas 
      SET solicitacoes = TRIM(BOTH ',' FROM REPLACE(solicitacoes, ?, ''))
      WHERE id = ?`;

  const queryAluno = `
      UPDATE users 
      SET solicitacoes = TRIM(BOTH ',' FROM REPLACE(solicitacoes, ?, ''))
      WHERE matricula = ?`;

  try {
    await pool.query(queryTurma, [matricula, id]);

    await pool.query(queryAluno, [id, matricula]);

    return res
      .status(200)
      .json({ message: "Turma e Aluno atualizados removidos" });
  } catch (errors) {
    console.error("Erro ao remover solicitações:", errors);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { removerSolicitacoes };
