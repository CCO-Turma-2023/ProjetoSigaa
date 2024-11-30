import Horarios from "../../components/horarios";
import { FaBook } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import CardsInicio from "../../components/cardsInicio";
import MyCalendar from "../../components/calendario";
import { jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface User {
  matricula: string,
  name: string, 
  email: string,
  id: number,
  iat: number,
  type: Number,
  curso: string
}

export default function Inicio() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  let usuario;

  if(token){
    try{
    usuario = jwtDecode<User>(token);
    } catch (error) {
      navigate("/");
    }
  } else {
    navigate("/");
  }


  const cards = [
    {
      icon: FaBook,
      titulo: "Curso",
      texto: usuario?.curso,
      color: "#4DC2DF",
    },
    {
      icon: FaGraduationCap,
      titulo: "Currículo",
      texto: String(usuario?.matricula.substring(0, 4)) + " - " + String(Number(usuario?.matricula.substring(0, 4)) + 4),
      color: "#E37265",
    },
    {
      icon: FaUser,
      titulo: "Coordenador",
      texto: `Nome: Rafael Limas`,
      color: "#6DAC67",
    },
    {
      icon: FaUsers,
      titulo: "PRG",
      texto: `<div class="flex flex-col">
          <span>Telefone:</span> 
          <span>Email:</span>
        </div>`,
      color: "#E5AE55",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col gap-6">
      <div className="flex w-full text-center text-white">
        <div className="justify-left ml-[3rem] mt-4 flex w-full pr-1 text-center">
          <h1 className="text-4xl">Ciência da Computação (Graduação)</h1>
          <p className="ml-3 mt-2 text-xl text-[#efeff0]"> - 2025002135</p>
        </div>
      </div>
      <div className="mb-2 mt-2 flex items-center justify-center gap-[4rem]">
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
      <div className="flex w-full items-center justify-center gap-16 sm:flex-col lg:flex-row">
        <Horarios></Horarios>
        <MyCalendar></MyCalendar>
      </div>
    </div>
  );
}
