import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode";

interface User {
  matricula: string;
  name: string;
  email: string;
  id: number;
  iat: number;
  type: Number;
}

export default function SubMenu() {
  const [caminho, setCaminho] = useState(window.location.pathname);
  const navigate = useNavigate();

  const mudaSelecionado = (caminhoAtual: string) => {
    setCaminho(caminhoAtual);
  };

  let usuario: User | null = DecodificarToken();

  if (usuario === null) {
    navigate("/");
    return <></>;
  }

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
      {usuario && usuario.type === 0 ? (
        <Link
          onClick={() => mudaSelecionado("/matricula")}
          to="/matricula"
          className="flex items-center gap-[0.5rem]"
        >
          {" "}
          {caminho === "/matricula" ? <FaCircle /> : <FaRegCircle />}{" "}
          Solicitação de Matricula
        </Link>
      ) : (
        <Link
          onClick={() => mudaSelecionado("/listarTurmas")}
          to="/listarTurmas"
          className="flex items-center gap-[0.5rem]"
        >
        </Link>
      )}
    </div>
  );
}
