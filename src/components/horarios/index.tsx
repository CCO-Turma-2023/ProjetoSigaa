import DiasSemana from "./diasSemana";

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
        "CRSC04",
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
        "CRSC04",
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
        "CRSC04",
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
        "CRSC04",
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
        "CRSC04",
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
        "CRSC04",
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
        "CRSC04",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ],
    },
  ];

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
