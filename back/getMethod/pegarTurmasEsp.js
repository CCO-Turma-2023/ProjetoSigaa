const pool = require("../db");

const pegarTurmasEspecificas = async (req, res) => {
  const { ids } = req.headers;

  if (!ids || ids.trim() === "") {
    return res.status(404).json({ message: "Não há nenhuma turma" });
  }

  let idsV;

  // Separa os IDs e cria um array válido
  if (!ids.includes(",")) {
    idsV = [ids]; // Caso seja apenas um ID
  } else {
    idsV = ids.split(",").map((id) => id.trim()); // Divide e remove espaços extras
  }

  try {
    // Realiza a consulta com os IDs
    const [rows] = await pool.query("SELECT * FROM turmas WHERE id IN (?)", [
      idsV,
    ]);

    return res.status(200).json({ turmas: rows });
  } catch (err) {
    console.error("Erro ao buscar turmas:", err);
    return res
      .status(500)
      .json({ message: "Erro no servidor ao buscar turmas." });
  }
};

module.exports = { pegarTurmasEspecificas };
