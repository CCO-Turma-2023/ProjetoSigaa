// postMethod/cadastro.js
const pool = require("../db"); // Importa o pool de conexões do banco de dados

// Função para cadastrar ou atualizar um usuário
const cadastrarUsuario = (req, res) => {
  const infos = req.body.formValues;

  if (infos.senha === infos.confirmarSenha) {
    const query = "SELECT * FROM users WHERE matricula = ?";
    pool.query(query, [infos.matricula], (err, results) => {
      if (err) {
        console.log("Erro ao consultar BD");
        return res.status(500).json({ message: "Erro ao consultar BD" });
      }

      if (results.length === 1 && results[0].status === 0) {
        const update =
          "UPDATE users SET name = ?, senha = ?, email = ?, status = ? WHERE matricula = ?";

        pool.query(
          update,
          [infos.name, infos.senha, infos.email, 1, infos.matricula],
          (err, results) => {
            if (err) {
              console.error("Erro ao atualizar o usuário:", err);
              return res
                .status(500)
                .json({ message: "Erro ao atualizar usuário" });
            } else {
              console.log(
                `Usuário atualizado com sucesso! ID: ${results.insertId}`
              );
              return res.status(200).json({
                message: "Usuário atualizado com sucesso!",
              });
            }
          }
        );
      } else {
        return res
          .status(404)
          .json({ message: "Usuário não encontrado ou já está ativo" });
      }
    });
  } else {
    return res.status(400).json({ message: "Senhas não coincidem" });
  }
};

module.exports = { cadastrarUsuario };
