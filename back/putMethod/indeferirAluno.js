const pool = require("../db");
const { removerSolAlunoTurma } = require("./removerSolicitacao");

const indeferirAluno = async (req, res) => {
  const { aluno, turma } = req.body;

  const status = await removerSolAlunoTurma(aluno.matricula, turma.id);

  if (status === 500) {
    return res.status(500).json({ message: "Error no servidor" });
  }

  const queryAluno = `
      UPDATE users 
      SET turmasIn = 
          CASE 
              WHEN turmasIn IS NULL OR turmasIn = '' THEN ?
              ELSE CONCAT(turmasIn, ',', ?)
          END 
      WHERE matricula = ?`;

  try {
    
    await pool.query(queryAluno, [turma.id, turma.id, aluno.matricula]);

    return res.status(200).json({ message: "Turma e Aluno atualizados" });
  } catch (errors) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { indeferirAluno };
