import { useState, useEffect } from "react";
import DiscSolMatricula from "../../components/subMenuMatriculas";
import { propTurmas } from "../listarTurmas/page";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode";
import { User } from "../inicio/page";
import { toast } from "react-toastify";

export default function Matricula() {
  const [turmas, setTurmas] = useState<propTurmas[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<string[]>([]);

  const data = new Date()
  const ano = data.getFullYear()
  const mes = (data.getMonth() + 1)

  const [flagObg, setFlagObg] = useState(false);
  const [flagOpt, setFlagOpt] = useState(false);
  const [flagEle, setFlagEle] = useState(false);
  const [flagIn, setFlagIn] = useState(false);

  const navigate = useNavigate();

  let usuario: User | null = DecodificarToken();
  let userTurmas: string[] = [];
  let userTurmasIn :string[] = []

  if (usuario === null) {
    navigate("/");
    return <></>;
  } 

  if (usuario.turmasDef && usuario.turmasDef !== "" && !usuario.turmasDef.includes(",")) {
    userTurmas = [usuario.turmasDef];
  } else if (usuario.turmasDef && usuario.turmasDef !== "") {
    userTurmas = usuario.turmasDef.split(',');
  }

  if (usuario.turmasIn && usuario.turmasIn !== "" && !usuario.turmasIn.includes(",")) {
    userTurmasIn = [usuario.turmasIn];
  } else if (usuario.turmasIn && usuario.turmasIn !== "") {
    userTurmasIn = usuario.turmasIn.split(',');
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
      
      setTurmas(response.data.turmas);
    } catch (error) {
    }
  };

  const getSolicitacoes = async () => {
    const config: AxiosRequestConfig = {
      headers: {
        matricula: usuario.matricula,
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:3200/users/pegarSolicitacoes/",
        config,
      );

      if (!response.status) {
        toast.error("Erro ao pegar as solicitações de matrícula");
        return;
      }

      setSolicitacoes(response.data.solicitacoes.split(","));
    } catch (errors) {
    }
  };

  useEffect(() => {
    getTurma();
    getSolicitacoes();
  }, []);

  const mudaFlag = (tipo: string) => {
    if (tipo === "Obg") setFlagObg(!flagObg);
    else if (tipo === "Opt") setFlagOpt(!flagOpt);
    else if(tipo === "In") setFlagIn(!flagIn);
    else setFlagEle(!flagEle);
  };

  return (
    <div className="align-center flex w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div className="ml-[2rem] flex h-[90%] w-[95%] flex-col bg-white">
        <div className="m-3 ml-2 text-3xl">
          <h1>{`Matrículas: ${mes <= 7 ? 1 : 2}º Semestre - ${ano}`}</h1>
        </div>
        <div className="mb-3 ml-4 flex h-[3px] w-[97%] bg-[#d0d2d3]"></div>
        <div className="flex h-full w-full justify-between gap-[2rem] overflow-auto">
          <div className="w-[42%]">
            <div className="ml-16 flex w-full flex-col gap-[0.1rem] border-2 border-[#8a8c8c]">
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
                <div className="flex max-h-[135px] flex-col overflow-y-auto">
                  {turmas.map((turma, index) => {
                    return (
                      <>
                        {!userTurmas.includes(String(turma.id)) && !userTurmasIn.includes(String(turma.id)) && String(turma.periodo) !== "0" &&
                        turma.curso === usuario.curso &&
                        !solicitacoes.includes(String(turma.id)) ? (
                          <DiscSolMatricula
                            solicitada={false}
                            getSolicitacoes={getSolicitacoes}
                            key={index}
                            disc={turma}
                            In={false}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
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
                <div className="flex max-h-[135px] flex-col overflow-y-auto">
                  {turmas.map((turma, index) => {
                    return (
                      <>
                        {(!userTurmas.includes(String(turma.id)) && !userTurmasIn.includes(String(turma.id))) && String(turma.periodo) === "0" &&
                        turma.curso === usuario.curso &&
                        !solicitacoes.includes(String(turma.id)) ? (
                          <DiscSolMatricula
                            solicitada={false}
                            getSolicitacoes={getSolicitacoes}
                            key={index}
                            disc={turma}
                            In={false}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
              <div className="min-h-1/6 flex w-full justify-between bg-[#d0d2d3]">
                <button
                  onClick={() => {
                    mudaFlag("Ele");
                  }}
                  className="min-h-3/4 ml-2 flex w-full items-center justify-between p-[0.5rem] text-xl"
                >
                  <span>Turmas Eletivas</span>
                  <MdKeyboardArrowDown />
                </button>
              </div>
              {flagEle && (
                <div className="flex max-h-[135px] flex-col overflow-y-auto">
                  {turmas.map((turma, index) => {
                    return (
                      <>
                        {(!userTurmas.includes(String(turma.id)) && !userTurmasIn.includes(String(turma.id))) && turma.curso !== usuario.curso &&
                        !solicitacoes.includes(String(turma.id)) ? (
                          <DiscSolMatricula
                            solicitada={false}
                            getSolicitacoes={getSolicitacoes}
                            key={index}
                            disc={turma}
                            In={false}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
            <div className=" ml-16 min-h-1/6 flex w-full justify-between mt-[10%] bg-[#d0d2d3] border-[1px] border-black">
                <button
                  onClick={() => {
                    mudaFlag("In");
                  }}
                  className="min-h-3/4 ml-2 flex w-full items-center justify-between p-[0.5rem] text-xl"
                >
                  <span>Turmas Indeferidas</span>
                  <MdKeyboardArrowDown />
                </button>
              </div>
              {flagIn && (
                <div className="ml-16 w-full flex max-h-[135px] flex-col overflow-y-auto">
                  {turmas.map((turma, index) => {
                    return (
                      <>
                        {(userTurmasIn.includes(String(turma.id))) ? (
                          <DiscSolMatricula
                            solicitada={false}
                            getSolicitacoes={getSolicitacoes}
                            key={index}
                            disc={turma}
                            In={true}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
          </div>
          <div className="mr-16 flex h-[98%] w-[42%] flex-col border border-[2px] border-[#8a8c8c] pb-[1rem]">
            <div className="flex h-[6%] w-full items-center bg-[#d0d2d3] p-[1rem] text-center text-xl">
              <h2>Turmas Selecionadas</h2>
            </div>

            <div className="h-[97%] w-full overflow-auto">
              {
                <div className="flex max-h-full flex-col overflow-y-auto">
                  {turmas.map((turma, index) => {
                    return (
                      <>
                        {(!userTurmas.includes(String(turma.id)) && !userTurmasIn.includes(String(turma.id))) && solicitacoes.includes(String(turma.id)) ? (
                          <DiscSolMatricula
                            solicitada={true}
                            getSolicitacoes={getSolicitacoes}
                            key={index}
                            disc={turma}
                            In={false}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
