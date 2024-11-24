import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SubMenu() {
  const [caminho, setCaminho] = useState(window.location.pathname);

  const mudaSelecionado = (caminhoAtual: string) => {
    setCaminho(caminhoAtual);
  };

  return (
    <div className="flex flex-col gap-[0.5rem] bg-[#001858] p-[0.5rem] pl-[2rem] text-white">
      <Link
        onClick={() => mudaSelecionado("/turma")}
        to="/turma"
        className="flex items-center gap-[0.5rem]"
      >
        {" "}
        {caminho === "/turma" ? <FaCircle /> : <FaRegCircle />} Turmas Atuais
      </Link>
      <Link
        onClick={() => mudaSelecionado("/historico")}
        to="/historico"
        className="flex items-center gap-[0.5rem]"
      >
        {" "}
        {caminho === "/historico" ? <FaCircle /> : <FaRegCircle />} Histórico de
        Turmas
      </Link>
      <Link
        onClick={() => mudaSelecionado("/matricula")}
        to="/matricula"
        className="flex items-center gap-[0.5rem]"
      >
        {" "}
        {caminho === "/matricula" ? <FaCircle /> : <FaRegCircle />} Solicitação
        de Matricula
      </Link>
    </div>
  );
}
