const pool = require("../db");

const cadastrarUsuario = async (req, res) => {
  try {
    const infos = req.body;

    if (infos.senha !== infos.confirmarSenha) {
      return res.status(400).json({ message: "Senhas não coincidem" });
    }

    // Verifica se o usuário já existe e está inativo
    const [rows] = await pool.query("SELECT * FROM users WHERE matricula = ?", [
      infos.matricula,
    ]);

    if (rows.length === 1 && rows[0].status === 0) {
      // Se o usuário for encontrado e inativo, atualiza as informações
      const updateQuery =
        "UPDATE users SET name = ?, senha = ?, email = ?, status = ? WHERE matricula = ?";

      pool.query(updateQuery, [
        infos.nome,
        infos.senha,
        infos.email,
        1, // status ativo
        infos.matricula,
      ]);

      console.log("Usuário cadastrado com sucesso");

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso!" });
    } else {
      console.log("Usuário ja existente");

      return res
        .status(404)
        .json({ message: "Usuário não encontrado ou já está ativo" });
    }
  } catch (err) {
    console.error("Erro ao processar o cadastro:", err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { cadastrarUsuario };
