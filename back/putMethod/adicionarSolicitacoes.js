const pool = require("../db");

const adicionarSolicitacoes = async (req, res) => {
    const { matricula, id} = req.body;

    const queryTurma =`
      UPDATE turmas 
      SET solicitacoes = 
          CASE 
              WHEN solicitacoes IS NULL OR solicitacoes = '' THEN ?
              ELSE CONCAT(solicitacoes, ',', ?)
          END 
      WHERE id = ?`;

    
    const queryAluno = `
      UPDATE users 
      SET solicitacoes = 
          CASE 
              WHEN solicitacoes IS NULL OR solicitacoes = '' THEN ?
              ELSE CONCAT(solicitacoes, ',', ?)
          END 
      WHERE matricula = ?`;


    try {

      await pool.query(queryTurma, [matricula, matricula, id]);
      await pool.query(queryAluno, [id, id, matricula]);

      return res.status(200).json({ message: "Turma e Aluno atualizados" });

    } catch (errors) {
      return res.status(500).json({ message: "Erro no servidor" });
    }
}



module.exports = {adicionarSolicitacoes}