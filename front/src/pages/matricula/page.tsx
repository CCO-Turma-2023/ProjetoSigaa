import { useState, useEffect } from "react";
import DiscMatricula from "../../components/subMenuMatriculas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/menu/index.tsx";

export default function Matricula() {
  const navigate = useNavigate();
  const[user,setUser] = useState<user | null>(null);


  const [subMenuTurmasRecomendadas, setsubMenuTurmasRecomendadas] =
    useState(false);
  const [subMenuTurmasObrigatorias, setsubMenuTurmasObrigatorias] =
    useState(false);
  const [subMenuTurmasOptativas, setsubMenuTurmasOptativas] = useState(false);


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
    <div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div className="ml-[2rem] flex h-[90%] w-[95%] flex-col bg-white">
        <div className="m-3 ml-2 text-2xl">
          <h1>Matrículas - 1° Semestre - 2025</h1>
        </div>
        <div className="mb-3 ml-4 flex h-[3px] w-[97%] bg-[#d0d2d3]"></div>
        <div className="ml-4 flex w-2/6 flex-col gap-[0.5re] border-2 border-[#e3e3e3]">
          <div className="bg-[#d0d2d3] p-2">
            <button className="text-xl/2">Turmas Recomendadas</button>
          </div>
          <DiscMatricula />
          <div className="m-4 bg-[#d0d2d3] p-2">
            <button className="text-xl/2">Turmas Obrigatórias</button>
          </div>
          <div className="m-4 bg-[#d0d2d3] p-2">
            <button className="text-xl/2">Turmas Optativas</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
