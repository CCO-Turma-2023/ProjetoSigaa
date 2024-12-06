import { FaRegCircle } from "react-icons/fa";
import { PropsDisciplina } from "../disciplina";
import { propTurmas } from "../../pages/listarTurmas/page";

export default function DiscMatricula({ disc }: { disc: propTurmas }) {
  console.log("teste", disc);
  return (
    <div className="flex h-[8.5rem] w-[21%] border-[2px] border-[#e3e3e3]">
      <div className="flex flex-col">
        <div className="flex">
          <h2 className="ml-2 mt-1 text-[1.2rem] text-[#28c2c0]">
            {disc.sigla} -
          </h2>
          <p className="ml-1 mt-2">{disc.nome}</p>
        </div>
        <div className="flex">
          <div className="w-2/8 ml-3 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
          {disc.periodo}º Semestre 
          </div>
          <div className="w-2/8 ml-1 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            Obrigatória
          </div>
        </div>
        <div className="w-full mb-2 ml-3 mt-1 flex w-full">
          <div className="mt-2 w-full flex flex-col">
            {disc.horarios.map((horario, index) => {
              return (
                <span key={index} className="text-[1.0rem] flex items-center gap-1">
                  <FaRegCircle className="text-green-500" /> {horario}
                </span>
              );
            })}
          </div>
          <div className="ml-4 mb-4 flex w-1/4 flex-col justify-end justify-items-end gap-1">
            <button className="border-xl w-full rounded-lg border bg-blue-400">
              Editar
            </button>
            <button className="border-xl w-full rounded-lg border bg-red-500">
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
