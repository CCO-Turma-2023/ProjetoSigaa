const pool = require("../db");

const salvarEvento = async (req, res) => {
  try {
    const infos = req.body;

    // Se o usuário for encontrado e inativo, atualiza as informações
    const updateQuery =
      "INSERT INTO calendario SET title = ?, date = ?, description = ?, color = ?, curso = ?";

    await pool.query(updateQuery, [
      infos.nomeEvento,
      infos.data,
      infos.descricaoEvento,
      infos.corEvento,
      infos.curso,
    ]);

    return res.status(200).json({ message: "Enviado com suceso" });
  } catch (err) {
    console.error("Erro ao processar o cadastro:", err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { salvarEvento };
