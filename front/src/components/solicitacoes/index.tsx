import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { User } from "../../pages/inicio/page";
import { MdKeyboardArrowDown } from "react-icons/md";
import { propTurmas } from "../../pages/listarTurmas/page";
import { toast } from "react-toastify";

export default function Solicitacoes({ curso }: { curso: string }) {
  const [turmas, setTurmas] = useState<propTurmas[]>([]);
  const [flag, setFlag] = useState("");
  const [alunos, setAlunos] = useState<User[]>([]);
  const [temSolicitacoes, setTemSolicitacoes] = useState(false);

  const getTurma = async (turma? : propTurmas) => {
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
        if (response.data.turmas[i].solicitacoes) {
          response.data.turmas[i].solicitacoes =
            response.data.turmas[i].solicitacoes.split(",");
          if (response.data.turmas[i].curso === curso) setTemSolicitacoes(true);
        }

        if(response.data.turmas[i].sigla === turma?.sigla){
          pegarAlunos(response.data.turmas[i])
        }

      }
      setTurmas(response.data.turmas);
    } catch (error) {
      console.error("Erro ao requisitar turmas:", error);
    }
  };

  useEffect(() => {
    getTurma();
  }, []);

  const alterarFlag = (turma: propTurmas) => {
    if (String(turma.id) === flag) {
      setFlag("");
      return;
    }
    setFlag(String(turma.id));
    setAlunos([]);
    pegarAlunos(turma);
  };

  const pegarAlunos = async (turma: propTurmas) => {
    if(turma.solicitacoes){
      const config: AxiosRequestConfig = {
        headers: {
          solicitacoes: turma.solicitacoes,
        },
      };

      console.log(turma.sigla)

      try {
        const response = await axios.get(
          "http://localhost:3200/users/pegarAluno/",
          config,
        );

        if (!response.status) {
          toast.error("Alunos não encontrados");
          return;
        }

        setAlunos(response.data.alunos);
      } catch (errors) {
        toast.error("Erro no servidor");
      }
    }
  };

  const deferirMatricula = async (aluno: User, turma: propTurmas) => {
    const data = { aluno: aluno, turma: turma };

    let v;
    if(turma.participantes === null){
      v = 0
    }else{
      v = turma.participantes.split(",").length;
    }
    
    if (v >= Number(turma.vagas)) {
      toast.error("Turma lotada");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3200/turmas/deferir",
        data,
      );

      toast.success("Aluno deferido com sucesso");
      setTemSolicitacoes(false);
      getTurma(turma);
    } catch (errors) {
      console.error("Erro no Servidor");
    }
  };

  const indeferirMatricula = async (aluno: User, turma: propTurmas) => {
    const data = { aluno: aluno, turma: turma };

    try {
      const response = await axios.put(
        "http://localhost:3200/turmas/indeferir",
        data,
      );

      toast.success("Aluno indeferido");
      setTemSolicitacoes(false);
      getTurma(turma);
    } catch (errors) {
      console.error("Erro ao indeferir a matrícula");
    }
  };

  return (
    <div className="h-full w-[45%] bg-[rgba(0,17,61,1)]">
      <h1 className="m-2 text-2xl text-white">Solicitações de Matrícula</h1>
      <div className="ml-1 h-[3px] w-[99%] bg-[#e8e9ea]"></div>
      <div className="mt-2 min-h-[570px]">
        {temSolicitacoes && (
          <div className="ml-2 flex max-h-[450px] w-2/3 flex-col gap-[0.1rem] overflow-auto bg-white">
            {turmas.map((turma, index) => {
              return (
                <div className="h-full w-full" key={index}>
                  {turma.curso === curso &&
                    turma.solicitacoes != null &&
                    turma.solicitacoes[0] !== undefined && (
                      <>
                        <div className="flex w-full justify-between">
                          <button
                            className="ml-2 flex w-full items-center justify-between p-[0.5rem] text-xl"
                            id={String(turma.id)}
                            onClick={() => {
                              alterarFlag(turma);
                            }}
                          >
                            <span>{turma.nome}</span>
                            <MdKeyboardArrowDown />
                          </button>
                        </div>
                        {String(turma.id) === flag && (
                          <div className="justify-col flex w-full flex-col">
                            {alunos.map((aluno, index) => {
                              return (
                                <div className="flex w-full gap-4 border-[1px] border-t-black">
                                  <div className="mt-1 flex w-full items-center gap-4 p-2">
                                    <div className="flex min-w-[58%] flex-col rounded-[0.5rem] bg-[#e3e3e3] p-2 font-bold">
                                      <span
                                        className="text-1/2xl w-full"
                                        key={index}
                                      >
                                        {aluno.name} - {aluno.matricula}
                                      </span>
                                      <span
                                        className="text-1/2xl w-full"
                                        key={index}
                                      >
                                        {aluno.curso}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        deferirMatricula(aluno, turma);
                                      }}
                                      className="min-h-1 w-full rounded-xl bg-green-500 p-1"
                                    >
                                      Deferir
                                    </button>
                                    <button
                                      onClick={() => {
                                        indeferirMatricula(aluno, turma);
                                      }}
                                      className="mr-2 min-h-1 w-full rounded-xl bg-red-500 p-1"
                                    >
                                      Indeferir
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
