const pool = require("../db");

const editarEvento = async (req, res) => {
  try {
    const infos = req.body;

    pool.query(
      "UPDATE calendario SET title = ?, description = ? WHERE title = ?",
      [infos.nomeEvento, infos.descricaoEvento, infos.nomeAntigo]
    );

    return res.status(200).json({ message: "Evento editado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

module.exports = { editarEvento };
