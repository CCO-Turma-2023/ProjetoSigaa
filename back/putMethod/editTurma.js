const pool = require("../db");

const atualizarTurma = async (req, res) => {
  try {
    const { id } = req.params;

    const infos = req.body;

    let horarios = "";

    for (i in infos.horarios) {
      horarios += infos.horarios[i] + ",";
    }

    // Se o usuário for encontrado e inativo, atualiza as informações
    const updateQuery =
      "UPDATE turmas SET nome = ?, sigla = ?, professor = ?, vagas = ?, ano = ?, horarios = ?, periodo = ?, participantes = ?, cargaHoraria = ? WHERE id = ?";

    pool.query(updateQuery, [
      infos.nomeDisciplina,
      infos.sigla,
      infos.professor,
      infos.vagas,
      2024,
      horarios,
      infos.periodo,
      "",
      infos.cargaHoraria,
      id,
    ]);

    console.log("Turma editada com sucesso");

    return res.status(200).json({ message: "Turma editada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

module.exports = { atualizarTurma };
