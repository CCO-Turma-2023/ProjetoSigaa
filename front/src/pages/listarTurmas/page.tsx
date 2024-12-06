import axios from "axios";
import DiscMatricula from "../../components/subMenuMatriculas";
import { useEffect, useState } from "react";
import CriaTurma from "../../components/CriarTurma";
import { PropsDisciplina } from "../../components/disciplina";

export interface propTurmas {
  nome: string;
  sigla: string;
  situacao: string;
  professor: string;
  ano: string;
  horarios: string[];
  participantes: string;
  periodo: string;
}

export default function CriarTurma() {
  const [flag, setFlag] = useState(false);
  const [turmas, setTurmas] = useState<propTurmas[]>([]);

  const getTurma = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3200/turmas/pegarTurma/",
      );
      console.log("Turmas recebidas:", response.data.turmas);

      console.log("Turmas recebidas:", response.data.turmas);
      // Certifique-se de que `response.data.turmas` é um array
      if (Array.isArray(response.data.turmas)) {
        setTurmas(response.data.turmas); // Armazena as turmas diretamente
      } else {
        console.error("Formato de dados inválido: não é um array");
      }
    } catch (error) {
      console.error("Erro ao requisitar turmas:", error);
    }
  };

  useEffect(() => {
    getTurma();
  }, []);

  const fechar = (aux: boolean) => {
    setFlag(aux);
  };

  return (
    <div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div>{flag && <CriaTurma onClose={fechar} />}</div>
      <div className="align-center flex h-screen w-full flex-1 flex-col justify-center">
        <div className="ml-[2rem] flex h-[90%] w-[95%] flex-col bg-white">
          <div className="m-[1rem] ml-[2rem] flex text-3xl">
            <h1> 1° Semestre - 2025</h1>
          </div>
          <div className="mb-3 ml-4 flex h-[3px] w-[97%] bg-[#d0d2d3]"></div>
          <div className="max-h-[60%] min-h-[60%] overflow-auto">
            <div className="flex w-full flex-row flex-wrap justify-center gap-[2rem]">
              {turmas.map((turma, index) => (
                <DiscMatricula key={index} disc={turma} />
              ))}
            </div>
          </div>
          <div className="mb-2 flex h-1/4 w-full flex-col items-center justify-center gap-[2rem] text-center">
            <div className="ml-4 flex h-[3px] w-[97%] bg-[#d0d2d3]"></div>
            <button
              onClick={() => {
                fechar(true);
              }}
              className="border-xl h-[4rem] w-[10%] rounded-lg border bg-[#1f73f7]"
            >
              Criar Nova Turma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
