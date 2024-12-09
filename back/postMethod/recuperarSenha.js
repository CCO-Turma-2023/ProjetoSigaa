const pool = require("../db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "servidormaluco5@gmail.com",
    pass: "wztq oory okgt ljyj",
  },
});

const recuperarSenha = async (req, res) => {
  try {
    const { email, matricula } = req.body;

    // Usar await com o pool configurado para Promises
    const [rows] = await pool.query("SELECT * FROM users WHERE matricula = ?", [
      matricula,
    ]);

    // Verificar se o usuário existe
    if (rows.length === 0) {
      return res.status(404).send("Usuário não encontrado");
    }

    const user = rows[0]; // Pegar o primeiro (e único) resultado

    // Validar a email
    if (user.email !== email) {
      console.log("Email incorreto");
      return res.status(401).send("Email incorreto");
    }

    const token = crypto.randomBytes(32).toString("hex"); // Gera um token único
    await pool.query(
      "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE matricula = ?",
      [
        token,
        new Date(Date.now() + 3600 * 1000), // Expiração em 1 hora
        matricula,
      ]
    );

    const info = await transporter.sendMail({
      from: '"Equipe de Suporte" <servidormaluco5@gmail.com>',
      to: user.email, // destinatário
      subject: `Recuperação de Senha para ${user.name}`,
      text: `Olá ${user.name},\n\nVocê solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:5173/resetar-senha?token=${token}\n\nSe você não fez essa solicitação, ignore este e-mail.\n\nObrigado!`,
      html: `
              <p>Olá <strong>${user.name}</strong>,</p>
              <p>Você solicitou a recuperação de senha. Clique no botão abaixo para redefinir sua senha:</p>
              <a href="http://localhost:5173/resetar-senha?token=${token}" style="padding: 10px 15px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
              <p>Se você não fez essa solicitação, ignore este e-mail.</p>
              <p>Obrigado!</p>
          `,
    });

    console.log("Message sent: %s", info.messageId);

    return res.status(200).send("Email enviado");
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error.message);
    return res.status(500).send("Erro ao consultar o banco de dados");
  }
};

module.exports = { recuperarSenha };
