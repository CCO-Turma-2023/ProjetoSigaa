import { useState } from "react";
import axios from "axios";
import { propTurmas } from "../../pages/listarTurmas/page";
import { toast } from 'react-toastify';




export default function editarTurma({ onClose, turma }: {onClose: (aux: boolean) => void; turma: propTurmas}) {
  const dias = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
  const horariosInicio = ["7:00", "7:55", "8:50", "10:10", "11:05", "13:30", "14:25", "15:45", "16:40", "17:35",
                          "19:00", "19:50", "21:00", "21:50", "22:40"];
  const horariosTermino = ["7:55", "8:50", "9:45", "11:05", "12:00", "14:25", "15:20", "16:40", "17:35", "18:30",
                           "19:50", "20:40", "21:50", "22:40", "23:30"];
                    
  const [horariosSelecionados, setHorariosSelecionados] = useState<string[]>(turma.horarios);
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [horarioInicio, sethorarioInicio] = useState("");
  const [horarioFim, sethorarioFim] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState(turma.cargaHoraria);
  const [periodo, setPeriodo] = useState(turma.periodo);
  const [vagas, setVagas] = useState(turma.Vagas);
  const [sigla, setSigla] = useState(turma.sigla);
  const [nomeDisciplina, setNomeDisciplina] = useState(turma.nome);
  const [professor, setProfessor] = useState(turma.professor);
  const [obrigatoria, setObrigatoria] = useState(() => {
    if(turma.periodo){
        return true
    }else{
        return false
    }
  });

  const [qtdAulas, setQtdAulas] = useState(turma.qtdAulas);

  const resetarValores = () => {
    setHorariosSelecionados([]);
    setDiaSelecionado("");
    sethorarioInicio("");
    sethorarioFim("");
    setCargaHoraria("");
    setQtdAulas(0);

    console.log(qtdAulas)
  }


  const removerHorario = (horario : string) => {
    
    const aux = horario.split(" ");

    const indIni = horariosInicio.indexOf(aux[2]) // Primerio horário
    const indFim = horariosTermino.indexOf(aux[4]) // Segundo horário
    
    setQtdAulas(prevQtdAulas => prevQtdAulas - (indFim - indIni + 1));

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


  const alterarObrigatoria = () => {
    setObrigatoria(!obrigatoria);
  }


  const alterarCargaHoraria = (e : React.ChangeEvent<HTMLSelectElement>) => {
    resetarValores();
    setCargaHoraria(e.target.value);
  }


  const alterarPeriodo = (e : React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    if (!Number.isInteger(Number(valor)) || Number(valor) < 1) {
      setPeriodo("1");
      return;
    }

    if (Number(valor) > 10) {
      setPeriodo("10");
      return;
    }

    setPeriodo(e.target.value);
  }


  const alterarVagas = (e : React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    if (!Number.isInteger(Number(valor)) || Number(valor) < 10) {
      setVagas("10");
      return;
    }

    if (Number(valor) > 110) {
      setVagas("110");
      return;
    }

    setVagas(e.target.value);
  }


  const alterarCamposDisciplina = (e : React.ChangeEvent<HTMLInputElement>) => {

    const id = e.target.id;
    const valor = e.target.value;

    if (id === "sigla") {
      setSigla(valor);
    } else if (id === "prof") {
      setProfessor(valor);
    } else {
      setNomeDisciplina(valor);
    }

  }


  const adicionarHorario = () => {
    
    if (diaSelecionado === "" || horarioInicio === "" || horarioFim === "") {
      toast.warning("Preencha os Campos")
      return;
    }

    if (cargaHoraria === "") {
      toast.warning("Selecione uma carga horária")
      return;
    }

    const indIni = horariosInicio.indexOf(horarioInicio)
    const indFim = horariosTermino.indexOf(horarioFim)

    console.log(qtdAulas)

    if (indFim - indIni < 0) {
      toast.warning("Horários Inválidos")
      return;
    }

    if (indFim - indIni + qtdAulas + 1 > Number(cargaHoraria)/16) {
      toast.warning("Carga horária máxima atingida")
      return;
    }

    const horario = diaSelecionado + "  " + horarioInicio + " - " + horarioFim;

    if (horariosSelecionados.includes(horario)) {
      toast.warning("Horário já Selecionado");
      return;
    }

    setQtdAulas(prevQtdAulas => prevQtdAulas + indFim - indIni + 1);

    setHorariosSelecionados([...horariosSelecionados, horario]);

    setDiaSelecionado("");
    sethorarioInicio("");
    sethorarioFim("");
  }


  const editarTurma = async (e : React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!professor || !nomeDisciplina || !sigla) {
      toast.warning("Preencha todos os Campos")
      return;
    }

    if (horariosSelecionados.length === 0) {
      toast.warning("Selecione os horários");
      return;
    }

    if (qtdAulas < Number(cargaHoraria)/16) {
      toast.warning("Carga horária total não atingida");
      return;
    }

    console.log(cargaHoraria)

    const data = {
      periodo: obrigatoria ? periodo : "0",
      professor: professor,
      nomeDisciplina: nomeDisciplina,
      sigla: sigla,
      vagas: vagas,
      horarios: horariosSelecionados,
      cargaHoraria: cargaHoraria,
      qtdAulas: qtdAulas
    }

    try {
      const response = await axios.put (`http://localhost:3200/turmas/atualizarTurma/${turma.id}`, data);

      toast.success("Turma Editada com Sucesso");
      
      onClose(false)

    } catch(errors) {
      console.log("Erro ao criar a turma");
    }

  }


  const opcoesDias = [];
  for (let i in dias)
    opcoesDias.push(<option value={dias[i]}>{dias[i]}</option>)

  const opcoesHorariosInicio = []
  for (let i in horariosInicio)
    opcoesHorariosInicio.push(<option value={horariosInicio[i]}>{horariosInicio[i]}</option>)

  const opcoesHorariosTermino = []
  for (let i in horariosTermino)
    opcoesHorariosTermino.push(<option value={horariosTermino[i]}>{horariosTermino[i]}</option>)

  return (
    <div className="absolute -top-0 right-1/2 flex h-[100vh] w-[100vw] translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="h-[70%] w-[50%] rounded-[1rem] bg-white">
          <h1 className="rounded-t-[0.5rem] bg-green-700 p-[1rem] text-start text-3xl text-white">
            Editar turma
          </h1>
          <div className="m-[2rem] flex flex-col gap-[1rem]">
            <form onSubmit={editarTurma} className="flex flex-col gap-[1rem] border-[1px] border-black rounded-[1rem] p-[1rem]">
              <div className="flex gap-[0.5rem]">
                <label className="w-[10%]" htmlFor="sigla">Sigla</label>
                <input onChange={alterarCamposDisciplina} value={sigla} className="border-[1px] w-[39%] border-black" type="text" name="sigla" id="sigla" />
              </div>
              <div className="flex gap-[0.5rem]">
                <label className="w-[10%]" htmlFor="nomeDisc">Nome</label>
                <input onChange={alterarCamposDisciplina} value={nomeDisciplina} className="border-[1px] w-[39%] border-black" type="text" name="nomeDisc" id="nomeDisc" />
              </div>
              <div className="flex gap-[0.5rem]">
                <label className="w-[10%]" htmlFor="prof">Professor</label>
                <input onChange={alterarCamposDisciplina} value={professor} className="border-[1px] w-[39%] border-black" type="text" name="prof" id="prof" />
              </div>
              <div className="flex gap-[0.5rem]">
                <label className="w-[10%]" htmlFor="vagas">Vagas</label>
                <input value={vagas} onChange={alterarVagas} className="border-[1px] w-[5%] border-black text-center" type="number" name="vagas" id="vagas" />
                <div className="flex gap-1">
                <label className="ml-2" htmlFor="">Obrigatória?</label>
                <button onClick={alterarObrigatoria} type="button" className={`ml-2 w-[20px] h-[20px] mt-[0.2rem] border-[2px]
                                                  border-green-500 rounded-xl ${obrigatoria ? "bg-green-500" : "bg-white"}`}></button>
              </div>
              {obrigatoria && <div className="flex">
                <label className="ml-8 w-[11%]" htmlFor="periodo">Período</label>
                <input value={periodo} onChange={alterarPeriodo} className="ml-[2.5rem] border-[1px] w-[14%] border-black text-center" type="number" name="periodo" id="periodo" />
                </div>
                }
              </div>
              
              
              <div>
                <label htmlFor="cargaHoraria">Carga Horária</label>  
                <select onChange={alterarCargaHoraria} value={cargaHoraria} className="ml-2 bg-gray border-[2px] border-black rounded-xl" name="cargaHoraria" id="cargaHoraria">    
                  <option value="" disabled selected>Selecione uma opção</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                </select>
              </div>

              <div className="flex gap-4"> 
                <div className="flex flex-col text-center">
                  <label htmlFor="dia">Escolha o Dia da Semana</label>  
                  <select value={diaSelecionado} onChange={alterarValor}  className="ml-2 bg-gray border-[2px] border-black rounded-xl" name="dia" id="dia">   
                    <option value="" disabled selected>Selecione uma opção</option> 
                    {opcoesDias}
                  </select>
                </div>
                <div className="flex flex-col text-center">
                  <label htmlFor="horaIni">Início</label>  
                  <select value={horarioInicio} onChange={alterarValor} className="ml-2 bg-gray border-[2px] border-black rounded-xl" name="horaIni" id="horaIni">   
                    <option className="" value="" disabled selected>Selecione uma opção</option> 
                    {opcoesHorariosInicio}
                  </select>
                </div>
                <div className="flex flex-col text-center">
                  <label htmlFor="horaFim">Término</label>  
                  <select value={horarioFim} onChange={alterarValor}className="ml-2 bg-gray border-[2px] border-black rounded-xl" name="horaFim" id="horaFim">   
                    <option className="" value="" disabled selected>Selecione uma opção</option> 
                    {opcoesHorariosTermino}
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
              <div className="flex justify-center mt-4">
                <button className="bg-blue-500 w-[15%] rounded-[0.5rem]" type="submit">Editar</button>
              </div>

            </form>
                <button
                  className="w-[10%] rounded-[0.5rem] bg-red-500"
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
