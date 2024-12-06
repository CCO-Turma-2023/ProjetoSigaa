import { useState } from "react";
import axios from "axios";

export interface propsCriarTurma {
  onClose: (aux: boolean) => void;
}


export default function CriarTurma({ onClose }: propsCriarTurma) {
  const dias = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
  const horarios = ["7:00-7:55", "7:55-8:50", "8:50-9:45", "10:10-11:05", "11:05-12:00",
                    "13:30-14:25", "14:25-15:20", "15:45-16:40", "16:40-17:35", "17:35-18:30",
                    "19:00-19:50", "19:50-20:40", "21:00-21:50", "21:50-22:40", "22:40-23:30"]
                    
  const [horariosSelecionados, setHorariosSelecionados] = useState<string[]>([]);
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [horarioInicio, sethorarioInicio] = useState("");
  const [horarioFim, sethorarioFim] = useState("");


  const removerHorario = (horario : string) => {
    setHorariosSelecionados(horariosSelecionados.filter(i => i !== horario));
  }

  const alterarValor = (e : React.ChangeEvent<HTMLSelectElement>) => {

    const id = e.target.id;
    const valor = e.target.value;

    if (id === "dia") {
      setDiaSelecionado(valor);
    } else if (id === "horaIni") {
      sethorarioInicio(valor);
    } else {
      sethorarioFim(valor);
    }

  }


  const adicionarHorario = () => {

    if (diaSelecionado === "" || horarioInicio === "" || horarioFim === "") {
      return;
    }

    setHorariosSelecionados([...horariosSelecionados, diaSelecionado + "  " + horarioInicio + " | " + horarioFim]);
  }

  const opcoesDias = [];
  for (let i in dias)
    opcoesDias.push(<option value={dias[i]}>{dias[i]}</option>)
  const opcoesHorarios = []
  for (let i in horarios)
    opcoesHorarios.push(<option value={horarios[i]}>{horarios[i]}</option>)

  return (
    <div className="absolute -top-0 right-1/2 flex h-[100vh] w-[100vw] translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="h-[70%] w-[50%] rounded-[1rem] bg-white">
          <h1 className="rounded-t-[0.5rem] bg-green-700 p-[1rem] text-start text-3xl text-white">
            Criar turma
          </h1>
          <div className="m-[2rem] flex flex-col gap-[1rem]">
            <form className="flex flex-col gap-[1rem] border-[1px] border-black rounded-[1rem] p-[1rem]" action="">
              <div className="flex gap-[0.5rem]">
                <label htmlFor="disc">Disciplina a ser ofertada</label>
                <input className="border-[1px] w-[30%] border-black" type="text" name="disc" id="disc" />
              </div>
              
              <div>
                <label htmlFor="cargaHoraria">Carga Horária</label>  
                <select className="ml-2 bg-gray border-[2px] border-black rounded-xl" name="cargaHoraria" id="cargaHoraria">    
                  <option value="" disabled selected>Selecione uma opção</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                </select>
              </div>

              <div className="flex gap-4"> 
                <div className="flex flex-col text-center">
                  <label htmlFor="dia">Escolha o Dia da Semana</label>  
                  <select onChange={alterarValor}  className="ml-2 bg-gray border-[2px] border-black rounded-xl" name="dia" id="dia">   
                    <option value="" disabled selected>Selecione uma opção</option> 
                    {opcoesDias}
                  </select>
                </div>
                <div className="flex flex-col text-center">
                  <label htmlFor="horaIni">Início</label>  
                  <select onChange={alterarValor} className="ml-2 bg-gray border-[2px] border-black rounded-xl" name="horaIni" id="horaIni">   
                    <option className="" value="" disabled selected>Selecione uma opção</option> 
                    {opcoesHorarios}
                  </select>
                </div>
                <div className="flex flex-col text-center">
                  <label htmlFor="horaFim">Término</label>  
                  <select onChange={alterarValor}className="ml-2 bg-gray border-[2px] border-black rounded-xl" name="horaFim" id="horaFim">   
                    <option className="" value="" disabled selected>Selecione uma opção</option> 
                    {opcoesHorarios}
                  </select>
                </div>
                <button onClick={adicionarHorario} className="ml-24 mt-[1.5rem] bg-green-500 border-[2px] rounded-xl w-[10%] border-black" type="button">Adicionar</button>
              </div>
              {horariosSelecionados.length !== 0 &&
              <div className="p-[1rem] border-[1px] border-black rounded-[1rem] w-[60%]">
                <p>Horários</p>
                {horariosSelecionados.map ( (horario, index) => {
                  return (
                    <div className="mt-1 flex gap-[2rem]">
                      <p className="w-2/3" key={index}>{horario}</p>
                      <button onClick={() => {removerHorario(horario)}} className="bg-red-500 border-[2px] rounded-xl w-[30%] border-black" type="button">Remover</button>
                    </div>
                  );

                })}
              </div>
              }

              <button className="bg-blue-500 w-[15%] rounded-[0.5rem]">Criar</button>
            </form>

            <button
              className="w-1/5 rounded-[0.5rem] bg-red-500"
              onClick={() => {
                onClose(false);
              }}
            >
              {" "}
              Fechar
            </button>
        </div>
      </div>
    </div>
  );
}
