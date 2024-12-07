import { useState, useEffect } from "react";
import DiscSolMatricula from "../../components/subMenuMatriculas";
import { propTurmas } from "../listarTurmas/page";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";

const disc: propTurmas = {
  nome: "Arquitetura de Computadores II",
  sigla: "CRSC03",
  situacao: "a",
  professor: "Minoru",
  ano: 2025,
  horarios: ["Segunda-Feira 15:20-17:35"],
  participantes: "",
  periodo: "2",
  cargaHoraria: "32",
  vagas: "30",
  qtdAulas: 2,
  id: 1,
};

export default function Matricula() {
  const [subMenuTurmasRecomendadas, setsubMenuTurmasRecomendadas] =
    useState(false);
  const [subMenuTurmasObrigatorias, setsubMenuTurmasObrigatorias] =
    useState(false);
  const [subMenuTurmasOptativas, setsubMenuTurmasOptativas] = useState(false);

  const [turmas, setTurmas] = useState<propTurmas[]>([]);

  const [flagObg, setFlagObg] = useState(false);
  const [flagOpt, setFlagOpt] = useState(false);

  const getTurma = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3200/turmas/pegarTurma/",
      );
      console.log(response.data.turmas);
      for (let i = 0; i < response.data.turmas.length; i++) {
        response.data.turmas[i].horarios =
          response.data.turmas[i].horarios.split(",");
        response.data.turmas[i].horarios.pop(
          response.data.turmas[i].horarios.length - 1,
        );
      }
      console.log(response.data.turmas);
      setTurmas(response.data.turmas);
    } catch (error) {
      console.error("Erro ao requisitar turmas:", error);
    }
  };

  useEffect(() => {
    getTurma();
  }, []);

  const mudaFlag = (tipo: string) => {
    if (tipo === "Obg") setFlagObg(!flagObg);
    else setFlagOpt(!flagOpt);
  };

  return (
    <div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div className="ml-[2rem] flex h-[90%] w-[95%] flex-col bg-white">
        <div className="m-3 ml-2 text-3xl">
          <h1>Matrículas - 1° Semestre - 2025</h1>
        </div>
        <div className="mb-3 ml-4 flex h-[3px] w-[97%] bg-[#d0d2d3]"></div>
        <div className="ml-4 flex w-3/6 flex-col gap-[0.1rem] border-2 border-[#8a8c8c]">
          <div>
            <div className="flex w-full justify-between bg-[#d0d2d3]">
              <button
                onClick={() => {
                  mudaFlag("Obg");
                }}
                className="ml-2 flex w-full items-center justify-between p-[0.5rem] text-xl"
              >
                <span>Turmas Obrigatórias</span>
                <MdKeyboardArrowDown />
              </button>
            </div>
            {flagObg && (
              <div className="flex max-h-[200px] flex-col overflow-y-auto">
                {turmas.map((turma, index) => {
                  return (
                    <>
                      {String(turma.periodo) !== "0" ? (
                        <DiscSolMatricula key={index} disc={turma} />
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
            )}
          </div>
          <div className="min-h-1/6 flex w-full justify-between bg-[#d0d2d3]">
            <button
              onClick={() => {
                mudaFlag("Opt");
              }}
              className="min-h-3/4 ml-2 flex w-full items-center justify-between p-[0.5rem] text-xl"
            >
              <span>Turmas Optativas</span>
              <MdKeyboardArrowDown />
            </button>
          </div>
          {flagOpt && (
            <div className="flex max-h-[200px] flex-col overflow-y-auto">
              {turmas.map((turma, index) => {
                return (
                  <>
                    {String(turma.periodo) === "0" ? (
                      <DiscSolMatricula key={index} disc={turma} />
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
