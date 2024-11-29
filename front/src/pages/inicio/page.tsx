import Horarios from "../../components/horarios";
import { FaBook } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import CardsInicio from "../../components/cardsInicio";
import MyCalendar from "../../components/calendario";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/menu/index.tsx";

interface user {
  matricula: string,
  name: string, 
  email: string,
  id: number,
  iat: number
}

export default function Inicio() {
  const navigate = useNavigate();
  const[user,setUser] = useState<user | null>(null);

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
      texto: "Nome: Rafael Frinhani",
      color: "#6DAC67",
    },
    {
      icon: FaUsers,
      titulo: "Secretaria",
      texto: `<div class="flex flex-col">
          <span>Telefone:</span> 
          <span>Email:</span>
        </div>`,
      color: "#E5AE55",
    },
  ];


const config = {
  headers: {
      Authorization: "Bearer " + sessionStorage.getItem('token')
  }
}


useEffect(() =>{
    
    async function validaAcesso(){
        try {
            const resposta = await axios.get('http://localhost:3200/users/autentica',config);
            if(resposta.status === 201){
              setUser(resposta.data.user)
              console.log("Usuario autenticado");
                 return;
            }  
            navigate("/");
        } catch (error) {
            navigate("/")
        }
    }
    validaAcesso();
},[]);


  return (
    <div className="flex w-full">
    <Menu />
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
    </div>
  );
}
