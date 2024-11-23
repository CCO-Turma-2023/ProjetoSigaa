import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import Link from "next/link";


export default function SubMenu(){

    const [caminho, setCaminho] = useState(window.location.pathname.includes("disciplinas") ? window.location.pathname : "/disciplinas/turma");
    
    const mudaSelecionado = (caminhoAtual : string) => {
        setCaminho(caminhoAtual);
    }

    return (
        <div className="flex flex-col text-white pl-[2rem] p-[0.5rem] bg-[#001858] gap-[0.5rem]">
            <Link onClick={() => mudaSelecionado("/disciplinas/turma")} href = "/disciplinas/turma" className="flex gap-[0.5rem] items-center "> {caminho === "/disciplinas/turma" ? <FaCircle /> : <FaRegCircle />} Turmas Atuais</Link>
            <Link onClick={() => mudaSelecionado("/disciplinas/historico")} href="/disciplinas/historico" className="flex gap-[0.5rem] items-center "> {caminho === "/disciplinas/historico" ? <FaCircle /> : <FaRegCircle /> } Histórico de Turmas</Link>
            <Link onClick={() => mudaSelecionado("/disciplinas/matricula")} href="/disciplinas/matricula" className="flex gap-[0.5rem] items-center "> {caminho === "/disciplinas/matricula" ? <FaCircle /> : <FaRegCircle />} Solicitação de Matricula</Link>
        </div>
    )
}