const pool = require("../db");

const pegarTurmas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM turmas", []);

    return res.status(200).json({ turmas: rows });
  } catch (err) {}
};

module.exports = { pegarTurmas };
