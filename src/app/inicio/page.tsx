import Horarios from "../../components/horarios";
import Menu from "../../components/menu";
import Cards from "../../components/cardsInicio";
import { FaBook } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import CardsInicio from "../../components/cardsInicio";
import MyCalendar from "../../components/calendario";

export default function Inicio() {
  const cards = [
    {
      icon: FaBook,
      titulo: "Curso",
      texto: "Ciência da Computação",
      color: "#4DC2DF",
    },
    {
      icon: FaGraduationCap,
      titulo: "Currículo",
      texto: "2025-Atual",
      color: "#E37265",
    },
    {
      icon: FaUser,
      titulo: "Coordenador",
      texto: "Nome: Rafael Farinhas",
      color: "#6DAC67",
    },
    {
      icon: FaUsers,
      titulo: "Secretaria",
      texto: "Telefone: \nEmail:",
      color: "#E5AE55",
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-1 flex-col gap-6 bg-backgroundLinear">
      <div className="flex w-full text-center text-white">
        <div className="mt-4 flex w-full justify-center pr-1 text-center">
          <h1 className="text-4xl">Ciência da Computação (Graduação)</h1>
          <p className="ml-3 mt-2 text-xl text-[#efeff0]"> - 2023002135</p>
        </div>
      </div>
      <div className="mb-2 mt-2 flex flex-row items-center justify-center gap-[5rem]">
        {cards.map((card, index) => {
          return (
            <CardsInicio
              key={index}
              icon={card.icon}
              titulo={card.titulo}
              texto={card.texto}
              color={card.color}
            />
          );
        })}
      </div>
      <div className="h-3 w-full bg-[#00002B]"></div>
      <div className="mt-4 h-60 w-60">
        <Horarios />
      </div>
    </div>
  );
}
