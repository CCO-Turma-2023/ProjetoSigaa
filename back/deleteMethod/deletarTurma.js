const pool = require("../db");

const removerTurma = async (req, res) => {
    const {id} = req.params

    const deleteQuery =
        "DELETE FROM turmas WHERE id = ?";

    try{
        const [response] = await pool.query(deleteQuery,[id])

        console.log("opa")

        if(response.affectedRows > 0){
            console.log("Sucesso")
            res.status(200).json({ message: "Turma removida com sucesso!" });
        }else{
            console.log("Turma não encontrada")
            res.status(404).json({ message: "Turma não encontrada!" });
        }

    }catch(error){
        console.log("Erro")
        res.status(500).json({ message: "Erro ao remover!" });
    }
}

module.exports = {removerTurma}