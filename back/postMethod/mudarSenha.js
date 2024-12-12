const pool = require("../db");

const mudarSenha = async (req, res) => {
  const { token, novaSenha } = req.body;

  try {
    // Consultar o usuário pelo token
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE reset_token = ?",
      [token]
    );
    if (rows.length === 0) {
      return res.status(400).send("Token inválido ou expirado");
    }

    const user = rows[0];

    // Verificar se o token expirou

    if (new Date() > new Date(user.reset_token_expires)) {
      return res.status(400).send("Token expirado");
    }

    // Atualizar a senha do usuário (use hash para segurança)

    await pool.query(
      "UPDATE users SET senha = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?",
      [novaSenha, user.id]
    );

    return res.status(200).send("Senha atualizada com sucesso");
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error.message);
    return res.status(500).send("Erro interno");
  }
};

module.exports = { mudarSenha };
