const pool = require("../db");

const pegarEventos = async (req, res) => {
  const info = req.headers;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM calendario WHERE curso = ?",
      [info.curso]
    );
    if (rows.length >= 1) {
      return res.status(200).json(rows);
    } else {
      return res.status(200).json(null);
    }
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { pegarEventos };
