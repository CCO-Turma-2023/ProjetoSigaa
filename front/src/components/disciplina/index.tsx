import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import DialogTrancarCurso from "../dialogTrancamento";
import { propTurmas } from "../../pages/listarTurmas/page";
import { User } from "../../pages/inicio/page"
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode";

export default function Disciplina({ disciplina }: { disciplina: propTurmas }) {
  const [dialogTrancamentos, setDialogTrancamento] = useState(false);
  const navigate = useNavigate();

  const solicitarTrancamento = (index: boolean) => {
    setDialogTrancamento(index);
  };

  let usuario: User | null = DecodificarToken();

  if (usuario === null) {
    navigate("/");
    return <></>;
  }


  return (
    <div className="border-[1px] border-black p-[1rem]">
      {dialogTrancamentos && (
        <DialogTrancarCurso
          curso={disciplina.nome}
          periodo={disciplina.periodo}
          ano={String(disciplina.ano)}
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
            {Number(disciplina.periodo) !== 0 && usuario.curso === disciplina.curso ? disciplina.periodo
             : Number(disciplina.periodo) === 0 ? "Optativa" : "Eletiva"}/{String(disciplina.ano)}
          </p>
        </div>

        <div className="flex w-1/6 flex-col gap-[0.5rem]">
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
            className={`rounded-[0.4rem] bg-green-500 p-[0.3rem] font-bold text-white`}
          >
            {"Deferido"}
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
