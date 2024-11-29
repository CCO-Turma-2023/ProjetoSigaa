import Disciplina from "../../components/disciplina";
import { PropsDisciplina } from "../../components/disciplina";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../components/menu/index.tsx";
import { jwtDecode} from "jwt-decode";


interface user {
  matricula: string,
  name: string, 
  email: string,
  id: number,
  iat: number
}

interface JwtPayload {
  matricula: string;
  name: string;
  curso: string;
}


export default function Historico() {
  const navigate = useNavigate();
  const[user,setUser] = useState<user | null>(null);
  const token = sessionStorage.getItem("token");


  const disc: PropsDisciplina = {
    codigo: "CRSC03",
    nome: "ARQUITETURA DE COMPUTADORES I",
    periodo: "1º Semestre",
    ano: "2025",
    horarios: ["Terça-Feira - 13:30 - 15:20", "Quinta-Feira - 15:20 - 17:35"],
    situacao: "Encerrado",
  };


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
                console.log(resposta.data.user.matricula)
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

  if(token){
    const decoded = jwtDecode<JwtPayload>(token);
    console.log(decoded)
  }
  
  return (
    <div className="flex w-full">
    <Menu/>
    <div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div className="m-[2rem] h-[90%] w-[95%] overflow-x-auto bg-white p-3">
        <h1 className="m-[1rem] text-3xl">Histórico de Turmas</h1>
        <div className="m-[1.2rem] flex flex-col gap-4 overflow-auto">
          <Disciplina disciplina={disc} />
          <Disciplina disciplina={disc} />
          <Disciplina disciplina={disc} />
          <Disciplina disciplina={disc} />
          <Disciplina disciplina={disc} />
          <Disciplina disciplina={disc} />
          <Disciplina disciplina={disc} />
        </div>
      </div>
      </div>
    </div>
  );
}
