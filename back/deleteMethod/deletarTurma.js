const pool = require("../db");

const removerTurma = async (req, res) => {
  const { id } = req.params;

  const consultaTurmaQuery = "SELECT * FROM turmas WHERE id = ?"
  
  const deleteQuery = "DELETE FROM turmas WHERE id = ?";

  const queryAlunoSol = `
      UPDATE users 
      SET solicitacoes = TRIM(BOTH ',' FROM REPLACE(solicitacoes, ?, ''))
      WHERE matricula IN (?)`;

  const queryAlunoTurmasDef = `
      UPDATE users 
      SET turmasDef = TRIM(BOTH ',' FROM REPLACE(turmasDef, ?, ''))
      WHERE matricula IN (?)`;

  const queryAlunoTurmasIn = `
      UPDATE users 
      SET turmasIn = TRIM(BOTH ',' FROM REPLACE(turmasIn, ?, ''))
      WHERE matricula IN (?)`;

  try {
    const [consulta] = await pool.query(consultaTurmaQuery, [id]);

    let solicitacoes = [];
    let participantes = [];

    if (consulta[0].solicitacoes && consulta[0].solicitacoes !== "" && !consulta[0].solicitacoes.includes(",")) {
      solicitacoes = [consulta[0].solicitacoes];
    } else if (consulta[0].solicitacoes && consulta[0].solicitacoes !== "") {
      solicitacoes = consulta[0].solicitacoes.split(",");
    }

    if (consulta[0].participantes && consulta[0].participantes !== "" && !consulta[0].participantes.includes(",")) {
      participantes = [consulta[0].participantes];
    } else if (consulta[0].participantes && consulta[0].participantes !== "") {
      participantes = consulta[0].participantes.split(",");
    }

    if (solicitacoes.length > 0)
      await pool.query(queryAlunoSol, [id, solicitacoes]);

    if (participantes.length > 0) {
      await pool.query(queryAlunoTurmasDef, [id, participantes]);
      await pool.query(queryAlunoTurmasIn, [id, participantes]);
    } 
    
    const [response] = await pool.query(deleteQuery, [id]);

    if (response.affectedRows > 0) {
      res.status(200).json({ message: "Turma removida com sucesso!" });
    } else {
      res.status(404).json({ message: "Turma não encontrada!" });
    }
  } catch (error) {
    console.log("Erro");
    res.status(500).json({ message: "Erro ao remover!" });
  }
};

module.exports = { removerTurma };
