const pool = require("../db");
const { removerSolAlunoTurma } = require("./removerSolicitacao");

const deferirAluno = async (req, res) => {
  const { aluno, turma } = req.body;

  const status = await removerSolAlunoTurma(aluno.matricula, turma.id);

  if (status === 500) {
    return res.status(500).json({ message: "Error no servidor" });
  }

  const queryTurma = `
      UPDATE turmas 
      SET participantes = 
          CASE 
              WHEN participantes IS NULL OR participantes = '' THEN ?
              ELSE CONCAT(participantes, ',', ?)
          END 
      WHERE id = ?`;

  const queryAluno = `
      UPDATE users 
      SET turmasDef = 
          CASE 
              WHEN turmasDef IS NULL OR turmasDef = '' THEN ?
              ELSE CONCAT(turmasDef, ',', ?)
          END 
      WHERE matricula = ?`;

  try {
    await pool.query(queryTurma, [aluno.matricula, aluno.matricula, turma.id]);
    
    await pool.query(queryAluno, [turma.id, turma.id, aluno.matricula]);

    return res.status(200).json({ message: "Turma e Aluno atualizados" });
  } catch (errors) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { deferirAluno };
