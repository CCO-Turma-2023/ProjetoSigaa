const pool = require("../db");

const pegarSolicitacoes = async (req, res) => {
    const {matricula} = req.headers;

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE matricula = ?", [matricula]);
    
        if (rows.length === 0) {
            return res.status(404).json({ message: "Aluno não encontrado"});
        }
        console.log(rows)
        return res.status(200).json({ solicitacoes: rows[0].solicitacoes});
      } catch (err) {
        return res.status(500).json( {message: "Erro no servidor"});
      }


};

module.exports = { pegarSolicitacoes };
