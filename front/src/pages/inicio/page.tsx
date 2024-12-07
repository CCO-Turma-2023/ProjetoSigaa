import Horarios from "../../components/horarios";
import { FaBook } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import CardsInicio from "../../components/cardsInicio";
import MyCalendar from "../../components/calendario";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface User {
  matricula: string;
  name: string;
  email: string;
  id: number;
  iat: number;
  type: Number;
  curso: string;
}

export default function Inicio() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  let usuario: User;
  const [curso, setCurso] = useState({
    curso: "",
    sigla: "",
    codigo: "",
    coordenador: "",
  });

  if (token) {
    try {
      usuario = jwtDecode<User>(token);
    } catch (error) {
      navigate("/");
      return <></>;
    }
  } else {
    navigate("/");
    return <></>;
  }

  const config: AxiosRequestConfig = {
    headers: {
      curso: usuario.curso,
    },
  };

  useEffect(() => {
    const pegarCurso = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3200/users/pegarCurso",
          config,
        );
        setCurso(response.data);

        setLoading(false);
      } catch (error) {
        console.log("Erro ao pegar curso");
      }
    };
    pegarCurso();
  }, []);

  if (loading) {
    return <></>;
  }

  const cards = [
    {
      icon: FaBook,
      titulo: "Curso",
      texto: usuario.curso,
      color: "#4DC2DF",
    },
    {
      icon: FaGraduationCap,
      titulo: "Currículo",
      texto: "a",
      color: "#E37265",
    },
    {
      icon: FaUser,
      titulo: "Coordenador",
      texto: `Nome: ${curso.coordenador}`,
      color: "#6DAC67",
    },
    {
      icon: FaUsers,
      titulo: "PRG",
      texto: `<div class="flex flex-col">
          <span>Contato: (35) 3629-1282</span> 
          <span>Email: prg@unifei.edu.br</span>
        </div>`,
      color: "#E5AE55",
    },
  ];

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 bg-backgroundLinear">
      <div className="flex w-full text-center text-white">
        <div className="justify-left ml-[3rem] mt-4 flex w-full pr-1 text-center">
          <h1 className="text-4xl">{usuario.curso} (Graduação)</h1>
          <p className="ml-3 mt-2 text-xl text-[#efeff0]"> - {curso.codigo}</p>
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
