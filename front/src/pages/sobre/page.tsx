import { useState } from "react";
import Header from "../../components/headerInicio";
import Membro from "../../components/membro";

export default function Sobre() {
  const [membros] = useState([
    {
      nome: "Caio Mendes Ribeiro da Rosa",
      matricula: "2023002135",
    },
    {
      nome: "Davi Dias Monsores dos Santos",
      matricula: "2023001272",
    },
    {
      nome: "Gabriel Henrique dos Santos Alves",
      matricula: "2023010208",
    },
    {
      nome: "Tiago de Figueiredo Reis",
      matricula: "2023009225",
    },
    {
      nome: "Paulo Alexandre de Oliveira N. Filho",
      matricula: "2023007374",
    },
  ]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-backgroundLinear">
      <Header selecionado="sobre" />
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
        <div className="flex h-[30rem] w-[60rem] flex-col gap-3 overflow-hidden rounded-3xl bg-white p-4">
          <h1 className="text-center text-3xl font-bold">Projeto SIGAA</h1>
          <p className="text-center text-xl text-[#494848]">
            O projeto foi idealizado e desenvolvido pelos seguintes membros
          </p>
          <div className="flex w-full flex-wrap items-center justify-center gap-5">
            {membros.map((membro, index) => {
              return (
                <Membro
                  key={index}
                  nome={membro.nome}
                  matricula={membro.matricula}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
