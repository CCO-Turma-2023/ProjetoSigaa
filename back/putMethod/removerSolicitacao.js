const pool = require("../db");

const removerSolicitacoes = async (req, res) => {
  const { matricula, id } = req.body;

  const status = await removerSolAlunoTurma(matricula, id);

  if (status === 200) {
    return res
      .status(200)
      .json({ message: "Turma e Aluno atualizados removidos" });
  } else {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

const removerSolAlunoTurma = async (matricula, id) => {
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

    return 200;
  } catch (errors) {
    console.error("Erro ao remover solicitações:", errors);
    return 500;
  }
};

module.exports = { removerSolicitacoes, removerSolAlunoTurma };
