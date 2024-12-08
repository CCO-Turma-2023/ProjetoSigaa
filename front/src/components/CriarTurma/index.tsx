import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../../pages/inicio/page"
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode";

export interface propsCriarTurma {
  onClose: (aux: boolean, pegarTurmasNovamente: boolean) => void;
}

// Variável não pode estar dentro do componente para não ser renderizada toda vez por causa
// do useState
let qtdAulas = 0;

export default function CriarTurma({ onClose }: propsCriarTurma) {
  const navigate = useNavigate();
  const dias = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];
  const horariosInicio = [
    "7:00",
    "7:55",
    "8:50",
    "10:10",
    "11:05",
    "13:30",
    "14:25",
    "15:45",
    "16:40",
    "17:35",
    "19:00",
    "19:50",
    "21:00",
    "21:50",
    "22:40",
  ];
  const horariosTermino = [
    "7:55",
    "8:50",
    "9:45",
    "11:05",
    "12:00",
    "14:25",
    "15:20",
    "16:40",
    "17:35",
    "18:30",
    "19:50",
    "20:40",
    "21:50",
    "22:40",
    "23:30",
  ];

  const [horariosSelecionados, setHorariosSelecionados] = useState<string[]>(
    [],
  );
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [horarioInicio, sethorarioInicio] = useState("");
  const [horarioFim, sethorarioFim] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [periodo, setPeriodo] = useState("1");
  const [vagas, setVagas] = useState("10");
  const [sigla, setSigla] = useState("");
  const [nomeDisciplina, setNomeDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [obrigatoria, setObrigatoria] = useState(false);


  let usuario: User | null = DecodificarToken();

  if (usuario === null) {
    navigate("/");
    return <></>;
  }

  const resetarValores = () => {
    setHorariosSelecionados([]);
    setDiaSelecionado("");
    sethorarioInicio("");
    sethorarioFim("");
    setCargaHoraria("");
    qtdAulas = 0;
  };

  const removerHorario = (horario: string) => {
    const aux = horario.split(" ");

    const indIni = horariosInicio.indexOf(aux[2]); // Primerio horário
    const indFim = horariosTermino.indexOf(aux[4]); // Segundo horário

    qtdAulas -= indFim - indIni + 1;

    setHorariosSelecionados(horariosSelecionados.filter((i) => i !== horario));
  };


  const alterarValor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.id;
    const valor = e.target.value;

    if (id === "dia") {
      setDiaSelecionado(valor);
    } else if (id === "horaIni") {
      sethorarioInicio(valor);
    } else {
      sethorarioFim(valor);
    }
  };


  const alterarObrigatoria = () => {
    setObrigatoria(!obrigatoria);
  };


  const alterarCargaHoraria = (e: React.ChangeEvent<HTMLSelectElement>) => {
    resetarValores();
    setCargaHoraria(e.target.value);
  };


  const alterarPeriodo = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };


  const alterarVagas = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };


  const alterarCamposDisciplina = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const valor = e.target.value;

    if (id === "sigla") {
      setSigla(valor);
    } else if (id === "prof") {
      setProfessor(valor);
    } else {
      setNomeDisciplina(valor);
    }
  };


  const adicionarHorario = () => {
    if (diaSelecionado === "" || horarioInicio === "" || horarioFim === "") {
      toast.warning("Preencha os Campos");
      return;
    }

    if (cargaHoraria === "") {
      toast.warning("Selecione uma carga horária");
      return;
    }

    const indIni = horariosInicio.indexOf(horarioInicio);
    const indFim = horariosTermino.indexOf(horarioFim);

    if (indFim - indIni < 0) {
      toast.warning("Horários Inválidos");
      return;
    }

    if (indFim - indIni + qtdAulas + 1 > Number(cargaHoraria) / 16) {
      toast.warning("Carga horária máxima atingida");
      return;
    }

    const horario = diaSelecionado + "  " + horarioInicio + " - " + horarioFim;

    if (horariosSelecionados.includes(horario)) {
      toast.warning("Horário já Selecionado");
      return;
    }

    qtdAulas += indFim - indIni + 1;

    setHorariosSelecionados([...horariosSelecionados, horario]);

    setDiaSelecionado("");
    sethorarioInicio("");
    sethorarioFim("");
  };


  const adicionarTurma = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!professor || !nomeDisciplina || !sigla) {
      toast.warning("Preencha todos os Campos");
      return;
    }

    if (horariosSelecionados.length === 0) {
      toast.warning("Selecione os horários");
      return;
    }

    if (qtdAulas < Number(cargaHoraria) / 16) {
      toast.warning("Carga horária total não atingida");
      return;
    }

    const data = {
      periodo: obrigatoria ? periodo : "0",
      professor: professor,
      nomeDisciplina: nomeDisciplina,
      sigla: sigla,
      vagas: vagas,
      horarios: horariosSelecionados,
      cargaHoraria: cargaHoraria,
      curso: usuario.curso,
    };

    try {
      const response = await axios.post(
        "http://localhost:3200/turmas/adicionarTurma/",
        data,
      );

      if (!response.status) {
        toast.error("Houve um erro ao criar a turma");
        return;
      }

      toast.success("Turma Criada com Sucesso");

      onClose(false, true);
    } catch (errors) {
      toast.error("Houve um erro ao criar a turma");
    }
  };

  
  const opcoesDias = [];
  for (let i in dias)
    opcoesDias.push(<option value={dias[i]}>{dias[i]}</option>);

  const opcoesHorariosInicio = [];
  for (let i in horariosInicio)
    opcoesHorariosInicio.push(
      <option value={horariosInicio[i]}>{horariosInicio[i]}</option>,
    );

  const opcoesHorariosTermino = [];
  for (let i in horariosTermino)
    opcoesHorariosTermino.push(
      <option value={horariosTermino[i]}>{horariosTermino[i]}</option>,
    );

  return (
    <div className="absolute -top-0 right-1/2 flex h-[100vh] w-[100vw] translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="h-[73%] w-[50%] rounded-[1rem] bg-white">
        <h1 className="rounded-t-[0.5rem] bg-green-700 p-[1rem] text-start text-3xl text-white">
          Criar turma
        </h1>
        <div className="m-[2rem] flex flex-col gap-[1rem]">
          <form
            onSubmit={adicionarTurma}
            className="flex flex-col gap-[1rem] rounded-[1rem] border-[1px] border-black p-[1rem]"
          >
            <div className="flex gap-[0.5rem]">
              <label className="w-[10%]" htmlFor="sigla">
                Sigla
              </label>
              <input
                onChange={alterarCamposDisciplina}
                className="w-[39%] border-[1px] border-black"
                type="text"
                name="sigla"
                id="sigla"
              />
            </div>
            <div className="flex gap-[0.5rem]">
              <label className="w-[10%]" htmlFor="nomeDisc">
                Nome
              </label>
              <input
                onChange={alterarCamposDisciplina}
                className="w-[39%] border-[1px] border-black"
                type="text"
                name="nomeDisc"
                id="nomeDisc"
              />
            </div>
            <div className="flex gap-[0.5rem]">
              <label className="w-[10%]" htmlFor="prof">
                Professor
              </label>
              <input
                onChange={alterarCamposDisciplina}
                className="w-[39%] border-[1px] border-black"
                type="text"
                name="prof"
                id="prof"
              />
            </div>
            <div className="flex gap-[0.5rem]">
              <label className="w-[10%]" htmlFor="vagas">
                Vagas
              </label>
              <input
                value={vagas}
                onChange={alterarVagas}
                className="w-[5%] border-[1px] border-black text-center"
                type="number"
                name="vagas"
                id="vagas"
              />
              <div className="flex gap-1">
                <label className="ml-2" htmlFor="">
                  Obrigatória?
                </label>
                <button
                  onClick={alterarObrigatoria}
                  type="button"
                  className={`ml-2 mt-[0.2rem] h-[20px] w-[20px] rounded-xl border-[2px] border-green-500 p-1 ${obrigatoria ? "bg-green-500" : "bg-white"}`}
                ></button>
              </div>
              {obrigatoria && (
                <div className="flex">
                  <label className="ml-8 w-[11%]" htmlFor="periodo">
                    Período
                  </label>
                  <input
                    value={periodo}
                    onChange={alterarPeriodo}
                    className="ml-[2.5rem] w-[14%] border-[1px] border-black text-center"
                    type="number"
                    name="periodo"
                    id="periodo"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="cargaHoraria">Carga Horária</label>
              <select
                onChange={alterarCargaHoraria}
                className="bg-gray ml-2 rounded-xl border-[2px] border-black"
                name="cargaHoraria"
                id="cargaHoraria"
              >
                <option value="" disabled selected>
                  Selecione uma opção
                </option>
                <option value="32">32</option>
                <option value="64">64</option>
              </select>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col text-center">
                <label htmlFor="dia">Escolha o Dia da Semana</label>
                <select
                  value={diaSelecionado}
                  onChange={alterarValor}
                  className="bg-gray ml-2 rounded-xl border-[2px] border-black"
                  name="dia"
                  id="dia"
                >
                  <option value="" disabled selected>
                    Selecione uma opção
                  </option>
                  {opcoesDias}
                </select>
              </div>
              <div className="flex flex-col text-center">
                <label htmlFor="horaIni">Início</label>
                <select
                  value={horarioInicio}
                  onChange={alterarValor}
                  className="bg-gray ml-2 rounded-xl border-[2px] border-black"
                  name="horaIni"
                  id="horaIni"
                >
                  <option className="" value="" disabled selected>
                    Selecione uma opção
                  </option>
                  {opcoesHorariosInicio}
                </select>
              </div>
              <div className="flex flex-col text-center">
                <label htmlFor="horaFim">Término</label>
                <select
                  value={horarioFim}
                  onChange={alterarValor}
                  className="bg-gray ml-2 rounded-xl border-[2px] border-black"
                  name="horaFim"
                  id="horaFim"
                >
                  <option className="" value="" disabled selected>
                    Selecione uma opção
                  </option>
                  {opcoesHorariosTermino}
                </select>
              </div>
              <button
                onClick={adicionarHorario}
                className="ml-24 mt-[1.5rem] w-[10%] rounded-xl bg-green-500 p-1"
                type="button"
              >
                Adicionar
              </button>
            </div>
            {horariosSelecionados.length !== 0 && (
              <div className="w-[60%] rounded-[1rem] border-[1px] border-black p-[1rem]">
                <p>Horários</p>
                {horariosSelecionados.map((horario, index) => {
                  return (
                    <div className="mt-1 flex gap-[2rem]">
                      <p className="w-2/3" key={index}>
                        {horario}
                      </p>
                      <button
                        onClick={() => {
                          removerHorario(horario);
                        }}
                        className="w-[30%] rounded-xl border-[2px] bg-red-500 p-1"
                        type="button"
                      >
                        Remover
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mt-4 flex justify-center">
              <button
                className="w-[15%] rounded-[0.5rem] bg-blue-500 p-1"
                type="submit"
              >
                Criar
              </button>
            </div>
          </form>
          <button
            className="w-[10%] rounded-[0.5rem] bg-red-500 p-1"
            onClick={() => {
              onClose(false, false);
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
