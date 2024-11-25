const jwt = require("jsonwebtoken")

const {key} = require("../postMethod/login")

const autenticaUsuario = (req, res) =>{
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o token do cabeçalho

  if (!token){
    return res.status(401).json({ message: "Token não fornecido" });
  } 

  jwt.verify(token, key, (err, user) => {
    if (err) {
        return res.status(403).json({ message: "Token inválido" });
    }

    res.json({
        user: user
    });
  });
}

module.exports = {autenticaUsuario}