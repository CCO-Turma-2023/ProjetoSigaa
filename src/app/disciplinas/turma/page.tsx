import Disciplina from "../../../components/disciplina";
import {PropsDisciplina} from "../../../components/disciplina";


export default function Turma(){

    const disc: PropsDisciplina = {
        codigo: "TC026",
        nome: "ARQUITETURA DE COMPUTADORES I",
        periodo: "1º Semestre",
        ano: "2025",
        horarios: ["Não tem"],
        situacao: "Matriculado"
    };

    return (
        <div className="flex align-center justify-center min-h-screen w-full flex-1 flex-col bg-backgroundLinear">

            <div className="bg-white w-[95%] h-[90%] m-[2rem]">
                <h1 className="m-[1rem] text-xl">Turmas Atuais</h1>
                <div className="m-[1.2rem]">
                    <Disciplina disciplina={disc} />
                </div>
            </div>
            

        </div>
    );
    
}