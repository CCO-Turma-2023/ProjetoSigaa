const pool = require("../db");
const {transporter} = require("./recuperarSenha");
const nodemailer = require("nodemailer");

const cadastrarUsuario = async (req, res) => {
  try {
    const infos = req.body;

    if (infos.senha !== infos.confirmarSenha) {
      return res.status(400).json({ message: "Senhas não coincidem" });
    }

    // Verifica se o email já existe e está inativo
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      infos.email,
    ]);

    if (rows.length === 0) {

      // Se o usuário for encontrado e inativo, atualiza as informações
      const qtdQuery = "SELECT COUNT(*) FROM users";

      const [qtd] = await pool.query(qtdQuery);
      
      const matricula = "2024" + (Number(qtd[0]["COUNT(*)"] % 10000)).toString().padStart(4, "0");

      const updateQuery =
        "INSERT INTO users SET name = ?, senha = ?, email = ?, status = ?, matricula = ?, curso = ?, type = ?";

      pool.query(updateQuery, [
        infos.nome,
        infos.senha,
        infos.email,
        1, // status ativo
        matricula,
        infos.curso,
        0,
      ]);

      const resposta = await transporter.sendMail({
        from: '"DTI - SIGAA UNIFEI" <servidormaluco5@gmail.com>',
        to: infos.email, // destinatário
        subject: `Cadastro de ${infos.nome}`,
        text: `Olá, ${infos.nome},\n\nVocê realizou o cadastro no SIGAA UNIFEI.`,
        html: `
                <p>Bem-Vindo(a), <strong>${infos.nome},</strong></p>
                <p>Você realizou o cadastro no SIGAA UNIFEI. Abaixo está o seu número de matrícula. Guarde esse número, pois é um identificador único para cada pessoa vinculada à faculdade.</p>
                <h1 style="width: 9rem; text-align: center; padding: 10px 15px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">${matricula}</h1>
                <p>Att,</p>
                <p>Equipe SIGAA</p>
            `,
      });

      return res.status(200).json({ status: true });
    } else {
      console.log("Usuário ja existente");

      return res.status(200).json({ status: false });
    }
  } catch (err) {
    console.error("Erro ao processar o cadastro:", err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { cadastrarUsuario };
