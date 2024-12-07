const pool = require("../db");

const adicionarTurma = async (req, res) => {
  try {
    const infos = req.body;

    let horarios = "";

    for (i in infos.horarios) {
      horarios += infos.horarios[i] + ",";
    }

    // Se o usuário for encontrado e inativo, atualiza as informações
    const updateQuery =
      "INSERT INTO turmas SET nome = ?, sigla = ?, professor = ?, vagas = ?, ano = ?, horarios = ?, periodo = ?, participantes = ?, cargaHoraria = ?";

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
    ]);

    console.log("Turma inserida com sucesso");

    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao processar o cadastro:", err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { adicionarTurma };
