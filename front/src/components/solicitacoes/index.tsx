import axios, {AxiosRequestConfig} from "axios";
import { useEffect, useState } from "react";
import CriaTurma from "../../components/CriarTurma";
import { User } from "../../pages/inicio/page";
import { MdKeyboardArrowDown } from "react-icons/md";
import { propTurmas } from "../../pages/listarTurmas/page";
import { toast } from "react-toastify";


export default function Solicitacoes( {curso} : {curso : string}) {
    const [turmas, setTurmas] = useState<propTurmas[]>([]);
    const [flag, setFlag] = useState("");
    const [alunos, setAlunos] = useState<User[]>([]);

    const getTurma = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3200/turmas/pegarTurma/",
          );
          
          for (let i = 0; i < response.data.turmas.length; i++) {
            response.data.turmas[i].horarios = response.data.turmas[i].horarios.split(",");
            response.data.turmas[i].horarios.pop(response.data.turmas[i].horarios.length - 1);
            if(response.data.turmas[i].solicitacoes){
                response.data.turmas[i].solicitacoes = response.data.turmas[i].solicitacoes.split(",");
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


    const alterarFlag = (turma : propTurmas) => {
        if (String(turma.id) === flag) {
            setFlag("");
            return;
        }
        setFlag(String(turma.id));
        setAlunos([]);
        pegarAlunos(turma);
    }


    const pegarAlunos = async (turma : propTurmas) => {

        const config: AxiosRequestConfig = {
            headers: {
              solicitacoes: turma.solicitacoes,
            },
          };
        try {
            const response = await axios.get("http://localhost:3200/users/pegarAluno/", config)

            if (!response.status) {
                toast.error("Alunos não encontrados");
                return;
            }

            setAlunos(response.data.alunos);

        } catch (errors) {
            toast.error("Erro no servidor");
        }

    }

    
    return (
        <div className="w-[45%] h-full bg-[rgba(0,17,61,1)]">
            <h1 className="m-2 text-white text-2xl">Solicitações de Matrícula</h1>
            <div className="h-[3px] w-[99%] bg-[#e8e9ea] ml-1"></div>
            <div className="min-h-[570px] mt-2">
           <div className="ml-2 flex w-2/3 flex-col gap-[0.1rem] max-h-[450px] bg-white overflow-auto">
            {turmas.map( (turma, index) => {
                return (<div className= "w-full h-full" key={index}>
                    {turma.curso === curso && turma.solicitacoes != null && turma.solicitacoes[0] !== undefined && 
                        <>
                            <div className="flex w-full justify-between">
                                <button
                                className="ml-2 flex w-full items-center justify-between p-[0.5rem] text-xl"
                                id={String(turma.id)} onClick={ () => {alterarFlag(turma);}} >
                                    <span>{turma.nome}</span>
                                    <MdKeyboardArrowDown />
                                </button>
                            </div>
                            {String(turma.id) === flag &&
                            <div className="flex w-full justify-col flex-col">
                                {alunos.map( (aluno, index) => {
                                    return (
                                    <div className="flex gap-4 w-full border-[1px] border-t-black">
                                        <div className="mt-1 flex w-full gap-4 p-2 items-center">
                                            <div className="flex flex-col min-w-[58%] bg-[#e3e3e3] font-bold rounded-[0.5rem] p-2">
                                                <span className="w-full text-1/2xl" key={index}>{aluno.name} - {aluno.matricula}</span>
                                                <span className="w-full text-1/2xl" key={index}>{aluno.curso}</span>
                                            </div>
                                            <button className="bg-green-500 rounded-xl w-full min-h-1 p-1">Deferir</button>
                                            <button className="bg-red-500 rounded-xl w-full min-h-1 p-1 mr-2">Indeferir</button>
                                        </div>
                                    </div>
                                    )
                                }
                                )}
                            </div>
                            }   
                        </>
                    }
                </div>)
                })
                }
            </div>
        </div> 
    </div>
    )

}