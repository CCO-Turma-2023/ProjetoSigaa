"use client";
import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import DialogTrancarCurso from "../dialogTrancamento";

export interface PropsDisciplina {
  nome: string;
  periodo: string;
  ano: string;
  horarios: string[];
  situacao: string;
  professor: string;
  sigla: string;
}

export default function Disciplina({
  disciplina,
}: {
  disciplina: PropsDisciplina;
}) {
  const [dialogTrancamentos, setDialogTrancamento] = useState(false);

  const solicitarTrancamento = (index: boolean) => {
    setDialogTrancamento(index);
  };

  return (
    <div className="border-[1px] border-black p-[1rem]">
      {dialogTrancamentos && (
        <DialogTrancarCurso
          curso={disciplina.nome}
          periodo={disciplina.periodo}
          ano={disciplina.ano}
          onClose={solicitarTrancamento}
        ></DialogTrancarCurso>
      )}
      <div className="flex">
        <h2 className="mb-[1rem] text-xl font-bold">{disciplina.sigla}</h2>
        <h2 className="mb-[1rem] ml-[0.4rem] text-xl"> - {disciplina.nome}</h2>
      </div>
      <div className="flex w-full gap-[6rem]">
        <div className="flex flex-col gap-[0.5rem]">
          <p className="font-bold">Período/Ano</p>
          <p>
            {disciplina.periodo}/{disciplina.ano}
          </p>
        </div>

        <div className="flex flex-col gap-[0.5rem]">
          <p className="font-bold">Horário</p>
          <p className="flex items-center gap-[0.2rem]"> </p>
          <div className="flex flex-col">
            {disciplina.horarios.map((horario, index) => {
              return (
                <span key={index} className="flex items-center gap-1">
                  <FaRegCircle className="text-green-500" /> {horario}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <p className="font-bold">Situação</p>
          <p
            className={`rounded-[0.4rem] ${disciplina.situacao === "Encerrado" ? "bg-red-500" : "bg-green-500"} p-[0.3rem] font-bold text-white`}
          >
            {disciplina.situacao}
          </p>
        </div>

        <div className="flex flex-col gap-[0.5rem]">
          {disciplina.situacao !== "Trancado" &&
            disciplina.situacao !== "Encerrado" && (
              <>
                <p className="font-bold">Ações</p>
                <button
                  onClick={() => {
                    solicitarTrancamento(true);
                  }}
                  className="rounded-[0.4rem] bg-red-500 p-[0.3rem] font-bold text-white"
                >
                  Solicitar trancamento
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
