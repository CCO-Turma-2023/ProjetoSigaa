const pool = require("../db");

const pegarCurso = async (req, res) => {
  try {
    const curso = req.headers.curso;
    console.log(curso);
    // Verifica se o usuário já existe e está inativo
    const [rows] = await pool.query("SELECT * FROM cursos WHERE curso = ?", [
      curso,
    ]);
    if (rows.length === 1) {
      console.log("Curso encontrado");

      return res
        .status(200)
        .json({
          curso: curso,
          sigla: rows[0].sigla,
          codigo: rows[0].codigo,
          coordenador: rows[0].coordenador,
        });
    } else {
      return res.status(404).json({ message: "Curso não encontrado" });
    }
  } catch (err) {
    console.error("Erro ao pegar o curso:", err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { pegarCurso };
