const pool = require("../db");
const nodemailer = require("nodemailer");

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
        const { matricula, email } = req.body;
    
        // Usar await com o pool configurado para Promises
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE matricula = ?", [
          matricula,
        ]);
    
        // Verificar se o usuário existe
        if (rows.length === 0) {
          return res.status(404).send("Usuário não encontrado");
        }
    
        const user = rows[0]; // Pegar o primeiro (e único) resultado
    
        // Validar a senha
        if (user.email !== email) {
            console.log("Email incorreto");
            return res.status(401).send("Email incorreto");
        } 

        const info = await transporter.sendMail({
            from: '"servidor" <servidormaluco5@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Impossivel", // Subject line
            text: "Chegou?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);

        return res.status(200).send("Email enviado");

      } catch (error) {
        console.error("Erro ao consultar o banco de dados:", error.message);
        return res.status(500).send("Erro ao consultar o banco de dados");
      }

}

module.exports = {recuperarSenha};