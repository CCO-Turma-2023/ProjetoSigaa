import DiasSemana from "./diasSemana";
import { useEffect, useState } from "react";
import { User } from "../../pages/inicio/page";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode";
import { propTurmas } from "../../pages/listarTurmas/page.tsx";

export default function Horarios() {
  const dias = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  const [turmasAtuais, setTurmasAtuais] = useState<propTurmas[]>([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const pegarTurmas = async () => {
      let usuario: User | null = DecodificarToken();

      if (usuario === null) {
        navigate("/");
        return <></>;
      }

      const config: AxiosRequestConfig = {
        headers: {
          ids: usuario.turmas,
        },
      };
      console.log(usuario);
      try {
        const response = await axios.get(
          "http://localhost:3200/users/pegarTurmas",
          config,
        );

        for (let i = 0; i < response.data.turmas.length; i++) {
          response.data.turmas[i].horarios =
            response.data.turmas[i].horarios.split(",");
          response.data.turmas[i].horarios.pop(
            response.data.turmas[i].horarios.length - 1,
          );
        }

        setTurmasAtuais(response.data.turmas);
      } catch (errors) {
        console.error("Erro ao pegar as turmas.");
      }
    };
    pegarTurmas();
  }, []);

  const processarHorarios = (
    horarios: string[],
  ): { dia: string; inicio: string; fim: string }[] => {
    return horarios.map((horario) => {
      const [dia, horas] = horario.split("  ");
      const [inicio, fim] = horas.split(" - ");
      return { dia: dia.trim(), inicio: inicio.trim(), fim: fim.trim() };
    });
  };

  const aulas = [
    {
      horario: [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ],
    },
    {
      horario: [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ],
    },
    {
      horario: [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ],
    },
    {
      horario: [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ],
    },
    {
      horario: [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ],
    },
    {
      horario: [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ],
    },
    {
      horario: [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ],
    },
  ];


  const pegarHorario = () => {
    const horarios: { [key: string]: { dia: string; inicio: string; fim: string; }[] } = {};
    for (let i in turmasAtuais) {
      horarios[turmasAtuais[i].sigla] = processarHorarios(turmasAtuais[i].horarios);
    }

    for (let i in horarios) {
      for (let j in horarios[i]) {
        const ind = dias.indexOf(horarios[i][j].dia);
        const ini = horariosInicio.indexOf(horarios[i][j].inicio);
        const fim = horariosTermino.indexOf(horarios[i][j].fim);

        for (let k = ini; k <= fim; k++) {
          aulas[ind].horario[k] = i;
        }
      }
    }
  }
  pegarHorario();

  const horarios = [
    "07:00 - 07:55",
    "07:55 - 08:50",
    "08:50 - 09:45",
    "10:10 - 11:05",
    "11:05 - 12:00",
    "13:30 - 14:25",
    "14:25 - 15:20",
    "15:45 - 16:40",
    "16:40 - 17:35",
    "17:35 - 18:30",
    "19:00 - 19:50",
    "19:50 - 20:40",
    "21:00 - 21:50",
    "21:50 - 22:40",
    "22:40 - 23:30",
  ];

  const diasSemanas = [];
  for (let i = 0; i < 7; i++) {
    diasSemanas.push(
      <>
        <DiasSemana dia={dias[i]} key={i} />
        {aulas[i].horario.map((dia, index) => {
          return <DiasSemana key={index} dia={dia} />;
        })}
      </>,
    );
  }

  return (
    <div className="flex items-center justify-center border border-white bg-[rgba(0,17,61,1)] p-3 text-xs">
      <div className="flex">
        <div className="flex flex-col">
          <DiasSemana dia={"Horário"} />
          {horarios.map((osHorarios, index) => {
            return <DiasSemana key={index} dia={osHorarios} />;
          })}
        </div>
        {diasSemanas.map((horario, index) => {
          return (
            <div key={index} className="flex flex-col">
              {horario}
            </div>
          );
        })}
      </div>
    </div>
  );
}
