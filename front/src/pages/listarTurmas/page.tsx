import axios from "axios";
import DiscMatricula from "../../components/subMenuCriarTurmas";
import { useEffect, useState } from "react";
import CriaTurma from "../../components/CriarTurma";
import { User } from "../../pages/inicio/page"
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode"


export interface propTurmas {
  nome: string;
  sigla: string;
  situacao: string;
  professor: string;
  ano: Number;
  horarios: string[];
  participantes: string;
  periodo: string;
  cargaHoraria: string;
  vagas: string;
  qtdAulas: number;
  curso: string;
  id: Number;
}

export default function CriarTurma() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [turmas, setTurmas] = useState<propTurmas[]>([]);

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

      setTurmas(response.data.turmas);
    } catch (error) {
      console.error("Erro ao requisitar turmas:", error);
    }
  };

  useEffect(() => {
    getTurma();
  }, []);


  let usuario: User | null = DecodificarToken();

  if (usuario === null) {
    navigate("/");
    return <></>;
  }


  const fechar = (aux: boolean, pegarTurmasNovamente: boolean) => {
    setFlag(aux);
    if (pegarTurmasNovamente) {
      getTurma();
    }
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
              {turmas.map((turma, index) => ( <>
                { turma.curso === usuario.curso ?
                <DiscMatricula key={index} disc={turma} onClose={fechar} /> : <></>
                }
                </>
                ))
              }
            </div>
          </div>
          <div className="mb-2 flex h-1/4 w-full flex-col items-center justify-center gap-[2rem] text-center">
            <div className="ml-4 flex h-[3px] w-[97%] bg-[#d0d2d3]"></div>
            <button
              onClick={() => {
                fechar(true, false);
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
