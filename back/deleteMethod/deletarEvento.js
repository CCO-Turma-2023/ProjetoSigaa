const pool = require("../db");

const deletarEvento = async (req, res) => {
  const nomeEvento = req.query.nomeEvento;

  const deleteQuery = "DELETE FROM calendario WHERE title = ?";

  try {
    const [response] = await pool.query(deleteQuery, [nomeEvento]);

    if (response.affectedRows > 0) {
      res.status(200).json({ message: "Evento deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Evento não encontrado" });
    }
  } catch (error) {
    console.log("Erro");
    res.status(500).json({ message: "Erro ao remover!" });
  }
};

module.exports = { deletarEvento };
