import { propTurmas } from "../../pages/listarTurmas/page";
import { FaRegCircle } from "react-icons/fa";
import { User } from "../../pages/inicio/page";
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode";
import axios from "axios";
import { toast } from "react-toastify";

export default function DiscSolMatricula({
  disc,
  getSolicitacoes,
  solicitada,
  turmas,
}: {
  disc: propTurmas;
  getSolicitacoes: () => void;
  solicitada: boolean;
  turmas: propTurmas[];
}) {
  const navigate = useNavigate();

  let usuario: User | null = DecodificarToken();

  if (usuario === null) {
    navigate("/");
    return <></>;
  }

  const solicitarMatricula = async () => {
    const data = {
      matricula: usuario.matricula,
      id: disc.id,
    };

    try {
      const response = await axios.put(
        "http://localhost:3200/turmas/adicionarSolicitacao/",
        data,
      );

      if (!response.status) {
        toast.error("Erro ao adicionar solicitação");
        return;
      }

      toast.success("Solicitação adicionada");
      getSolicitacoes();
    } catch (error) {
      toast.error("Erro ao adicionar solicitação");
    }
  };

  const removerSolicitao = async () => {
    const data = {
      matricula: usuario.matricula,
      id: disc.id,
    };

    try {
      const response = await axios.put(
        "http://localhost:3200/turmas/removerSolicitacao/",
        data,
      );

      if (!response.status) {
        toast.error("Erro ao adicionar solicitação");
        return;
      }

      toast.success("Solicitação removida");
      getSolicitacoes();
    } catch (error) {
      toast.error("Erro ao adicionar solicitação");
    }
  };

  return (
    <div className="flex h-full w-full items-end gap-[2rem] border-[1px] border-[#e3e3e3] pb-[1rem]">
      <div className="flex w-1/2 flex-col">
        <div className="flex">
          <h2 className="ml-2 mt-1 text-[1.2rem] text-[#28c2c0]">
            {disc.sigla} -
          </h2>
          <p className="ml-1 mt-2">{disc.nome}</p>
        </div>
        <div className="flex">
          {String(disc.periodo) !== "0" ? (
            <div className="w-2/8 ml-3 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
              {disc.periodo}° Semestre
            </div>
          ) : (
            <></>
          )}
          <div className="w-2/8 ml-1 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            {String(disc.periodo) === "0" ? "Optativa" : "Obrigatória"}
          </div>
          <div className="w-2/8 ml-1 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            {String(disc.curso) === "Ciência da Computação"
              ? "CCO"
              : String(disc.curso) === "Sistema da Informação"
                ? "SIN"
                : "MAT"}
          </div>
        </div>
        <div className="mb-1 ml-3 mt-1 flex flex-col">
          <p className="flex items-center gap-[0.2rem]"> </p>
          <div className="flex flex-col">
            {disc.horarios.map((horario, index) => {
              return (
                <span key={index} className="flex items-center gap-1">
                  <FaRegCircle className="text-green-500" /> {horario}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {!solicitada ? (
          <button
            className="ml-12 rounded-[1rem] bg-green-500 p-[0.5rem] font-bold text-white"
            onClick={solicitarMatricula}
          >
            Solicitar Matricula
          </button>
        ) : (
          <button
            className="ml-12 rounded-[1rem] bg-red-500 p-[0.5rem] font-bold text-white"
            onClick={removerSolicitao}
          >
            Remover Matricula
          </button>
        )}
      </div>
    </div>
  );
}
