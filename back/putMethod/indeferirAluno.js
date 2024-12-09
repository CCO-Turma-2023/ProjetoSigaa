const pool = require("../db");
const { removerSolAlunoTurma } = require("./removerSolicitacao");

const indeferirAluno = async (req, res) => {
  const { aluno, turma } = req.body;

  const status = await removerSolAlunoTurma(aluno.matricula, turma.id);

  if (status === 200) {
    return res.status(200).json({ message: "Turma e Aluno atualizados" });
  }

  return res.status(500).json({ message: "Erro no servidor" });
};

module.exports = { indeferirAluno };
