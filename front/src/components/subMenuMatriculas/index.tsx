import { propTurmas } from "../../pages/listarTurmas/page";
import { FaRegCircle } from "react-icons/fa";
import { User } from "../../pages/inicio/page";
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

let horariosC: string[] = [];

export default function DiscSolMatricula({
  disc,
  getSolicitacoes,
  solicitada,
  In
}: {
  disc: propTurmas;
  getSolicitacoes: () => void;
  solicitada: boolean;
  In : boolean
}) {
  const navigate = useNavigate();

  let usuario: User | null = DecodificarToken();

  if (usuario === null) {
    navigate("/");
    return <></>;
  }

  const getTurma = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3200/turmas/pegarTurma/",
      );

      for (let i = 0; i < response.data.turmas.length; i++) {
        response.data.turmas[i].horarios =
          response.data.turmas[i].horarios.split(",");
        response.data.turmas[i].horarios.pop(
          response.data.turmas[i].horarios.length - 1,
        );
      }

      let novosHorarios: string[] = [];
      for (let i in response.data.turmas) {
        const sol = String(response.data.turmas[i].solicitacoes).split(",");
        const participantes = String(response.data.turmas[i].participantes).split(",");
        if (participantes.includes(usuario.matricula)) {
          novosHorarios.push(...response.data.turmas[i].horarios);
        } else {
          for (let j in sol) {
            if (usuario.matricula === sol[j]) {
              novosHorarios.push(...response.data.turmas[i].horarios);
            } 
          }
        }
      }

      horariosC = [...novosHorarios];
    } catch (error) {
      console.error("Erro ao requisitar turmas:", error);
    }
  };

  useEffect(() => {
    getTurma();
  }, []);

  const processarHorarios = (
    horarios: string[],
  ): { dia: string; inicio: string; fim: string }[] => {
    console.log(horarios)
    return horarios.map((horario) => {
      console.log(horario)
      const [dia, horas] = horario.split("  ");
      console.log("dfjgkjdfkg", dia)
      const [inicio, fim] = horas.split(" - ")
      console.log("dsfiihd", inicio, fim)
   
      return { dia: dia.trim(), inicio: inicio.trim(), fim: fim.trim() };
    });
  };

  const verificaColisao = (Horarios: string[]) => {
    const novosHorarios = processarHorarios(Horarios);

    

    const novosHorariosC = processarHorarios(horariosC);

    for (const novoHorario of novosHorarios) {
      for (const horarioExistente of novosHorariosC) {
        if (novoHorario.dia === horarioExistente.dia) {
          const novoInicio = parseFloat(novoHorario.inicio.replace(":", "."));
          const novoFim = parseFloat(novoHorario.fim.replace(":", "."));
          const existenteInicio = parseFloat(
            horarioExistente.inicio.replace(":", "."),
          );
          const existenteFim = parseFloat(
            horarioExistente.fim.replace(":", "."),
          );

          if (
            (novoInicio >= existenteInicio && novoInicio < existenteFim) ||
            (novoFim > existenteInicio && novoFim <= existenteFim) ||
            (novoInicio <= existenteInicio && novoFim >= existenteFim)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const solicitarMatricula = async () => {
    if (verificaColisao(disc.horarios)) {
      toast.error("Conflito de horários detectado!");
      return;
    }

    const data = {
      matricula: usuario.matricula,
      id: disc.id,
    };

    try {
      const response = await axios.put(
        "http://localhost:3200/turmas/adicionarSolicitacao/",
        data,
      );

      if (!response.status) {
        toast.error("Erro ao adicionar solicitação");
        return;
      }

      toast.success("Solicitação adicionada");

      const aux = horariosC;

      getSolicitacoes();

      horariosC = [...aux, ...disc.horarios];
    } catch (error) {
      toast.error("Erro ao adicionar solicitação");
    }
  };

  const removerSolicitao = async () => {
    const data = {
      matricula: usuario.matricula,
      id: disc.id,
    };

    try {
      const response = await axios.put(
        "http://localhost:3200/turmas/removerSolicitacao/",
        data,
      );

      if (!response.status) {
        toast.error("Erro ao adicionar solicitação");
        return;
      }

      toast.success("Solicitação removida");

      getSolicitacoes();

      horariosC = horariosC.filter(
        (horarioExistente) => !disc.horarios.includes(horarioExistente),
      );
    } catch (error) {
      toast.error("Erro ao adicionar solicitação");
    }
  };

  return (
    <div className="flex h-full w-full items-end gap-[2rem] border-[1px] border-[#e3e3e3] pb-[1rem]">
      <div className="flex w-1/2 flex-col">
        <div className="flex">
          <h2 className="ml-2 mt-1 text-[1.2rem] text-[#28c2c0]">
            {disc.sigla} -
          </h2>
          <p className="ml-1 mt-2">{disc.nome}</p>
        </div>
        <div className="flex">
          {String(disc.periodo) !== "0" ? (
            <div className="w-2/8 ml-3 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
              {disc.periodo}° Semestre
            </div>
          ) : (
            <></>
          )}
          <div className="w-2/8 ml-1 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            {String(disc.periodo) === "0" ? "Optativa" : "Obrigatória"}
          </div>
          <div className="w-2/8 ml-1 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            {String(disc.curso) === "Ciência da Computação"
              ? "CCO"
              : String(disc.curso) === "Sistema da Informação"
                ? "SIN"
                : "MAT"}
          </div>
        </div>
        <div className="mb-1 ml-3 mt-1 flex flex-col">
          <p className="flex items-center gap-[0.2rem]"> </p>
          <div className="flex flex-col">
            {disc.horarios.map((horario, index) => {
              return (
                <span key={index} className="flex items-center gap-1">
                  <FaRegCircle className="text-green-500" /> {horario}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {!solicitada && !In ? (
          <button
            className="ml-12 rounded-[1rem] bg-green-500 p-[0.5rem] font-bold text-white"
            onClick={solicitarMatricula}
          >
            Solicitar Matricula
          </button>
        ) : !In ? (
          <button
            className="ml-12 rounded-[1rem] bg-red-500 p-[0.5rem] font-bold text-white"
            onClick={removerSolicitao}
          >
            Remover Matricula
          </button>
        ) :
        <> </>
        }
      </div>
    </div>
  );
}
