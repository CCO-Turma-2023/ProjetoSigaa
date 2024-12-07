import { FaRegCircle } from "react-icons/fa";
import { propTurmas } from "../../pages/listarTurmas/page";
import EditarTurma from "../editTurma";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function DiscMatricula({
  disc,
  onClose,
}: {
  disc: propTurmas;
  onClose: (aux: boolean, pegarTurmasNovamente: boolean) => void;
}) {
  const [flag, setFlag] = useState(false);

  console.log("teste", disc);

  const deleteTurma = async (id: Number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3200/turmas/removerTurma/${id}`,
      );

      toast.success("Turma Removida com Sucesso");

      onClose(false, true);
    } catch (error) {
      console.log("Não foi possivel remover a turma");
    }
  };

  const edit = (aux: boolean) => {
    setFlag(aux);
    onClose(false, true);
  };

  return (
    <div className="flex h-52 w-[20%] items-center justify-center border-[2px] border-[#e3e3e3] p-2">
      <div>{flag && <EditarTurma onClose={edit} turma={disc} />}</div>
      <div className="flex flex-col">
        <div className="flex">
          <h2 className="ml-2 mt-1 text-[1.2rem] text-[#28c2c0]">
            {disc.sigla} -
          </h2>
          <p className="ml-1 mt-2">{disc.nome}</p>
        </div>
        <div className="flex">
          {disc.periodo ? (
            <div className="w-2/8 ml-3 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
              {disc.periodo}º Semestre
            </div>
          ) : (
            <></>
          )}
          <div className="w-2/8 ml-2 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            {disc.periodo ? "Obrigatória" : "Optativa"}
          </div>
        </div>
        <div className="mb-2 ml-3 mt-1 flex w-full">
          <div className="mt-2 flex w-full flex-col">
            {disc.horarios.map((horario, index) => {
              return (
                <span
                  key={index}
                  className="flex items-center gap-1 text-[1.0rem]"
                >
                  <FaRegCircle className="text-green-500" /> {horario}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-1 font-bold">
          <button
            onClick={() => edit(true)}
            className="border-xl w-full rounded-lg border bg-blue-400 p-1"
          >
            Editar
          </button>
          <button
            onClick={() => deleteTurma(disc.id)}
            className="border-xl w-full rounded-lg border bg-red-500 p-1"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
