import Disciplina from "../../components/disciplina";
import { PropsDisciplina } from "../../components/disciplina";

export default function Turma() {
  const disc: PropsDisciplina = {
    codigo: "CRSC03",
    nome: "ARQUITETURA DE COMPUTADORES I",
    periodo: "1º Semestre",
    ano: "2025",
    horarios: ["Terça-Feira - 13:30 - 15:20", "Quinta-Feira - 15:20 - 17:35"],
    situacao: "Matriculado",
  };

  return (
    <div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div className="m-[2rem] h-[90%] w-[95%] overflow-x-auto bg-white p-3">
        <h1 className="m-[1rem] text-3xl">Turmas Atuais</h1>
        <div className="m-[1.2rem] flex flex-col gap-4 overflow-auto">
          <Disciplina disciplina={disc} />
        </div>
      </div>
    </div>
  );
}
