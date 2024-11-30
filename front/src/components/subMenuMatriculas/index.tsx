import { PropsDisciplina } from "../disciplina";
import { FaRegCircle } from "react-icons/fa";

export default function DiscMatricula() {
  const disc: PropsDisciplina = {
    codigo: "CRSC03",
    nome: "ARQUITETURA DE COMPUTADORES I",
    periodo: "1º Semestre",
    ano: "2025",
    horarios: ["Terça-Feira - 13:30 - 15:20", "Quinta-Feira - 15:20 - 17:35"],
    situacao: "Encerrado",
  };

  return (
    <div className="w-[25%] h-[8.5rem] flex border-[2px] border-[#e3e3e3]">
      <div className="flex flex-col">
        <div className="flex">
          <h2 className="ml-2 mt-1 text-[1.2rem] text-[#28c2c0]">
            {disc.codigo} -
          </h2>
          <p className="ml-1 mt-2">{disc.nome}</p>
        </div>
        <div className="flex">
          <div className="w-2/8 ml-3 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            {disc.periodo}
          </div>
          <div className="w-2/8 ml-1 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            Obrigatória
          </div>
        </div>
        <div className="w-full mb-1 ml-3 mt-1 flex">
          <div className="flex flex-col">
            {disc.horarios.map((horario, index) => {
              return (
                <span key={index} className="flex items-center gap-1">
                  <FaRegCircle className="text-green-500" /> {horario}
                </span>
              );
            })}
          </div>
          <div className="w-1/4 ml-12 flex flex-col gap-1 justify-items-end justify-end">
            <button className="w-full border border-xl rounded-lg bg-blue-400">
              Editar
            </button>
            <button className="w-full border border-xl rounded-lg bg-red-500">
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
