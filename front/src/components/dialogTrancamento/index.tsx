import { useState } from "react";

interface PropsDialogTrancamento {
  curso: string;
  periodo: string;
  ano: string;
  onClose: (rota: boolean) => void; // Boolean para indicar se fecha ou não
}

export default function DialogTrancarCurso({
  curso,
  periodo,
  ano,
  onClose,
}: PropsDialogTrancamento) {
  const [senha, setSenha] = useState("");

  const enviarSolicitacao = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita o reload da página
    console.log("Enviando solicitação de trancamento",);
  };

  const fecharTrancamento = (e: React.MouseEvent) => {
    e.preventDefault(); // Apenas evita comportamento padrão, por precaução
    onClose(false); // Fecha o modal sem enviar nada
  };

  return (
    <div className="absolute -top-0 right-1/2 flex h-[100vh] w-[100vw] translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="flex h-[20rem] w-[40rem] flex-col items-center justify-between rounded-[1rem] bg-white">
        <div className="bg-red-500 w-[100%] rounded-t-[1rem]">
          <h2 className="text-left text-xl p-[1rem] text-white ">
            Solicitar cancelamento de turma
          </h2>
        </div>
        <div className="flex flex-col self-start p-[1rem]">
          <p className="pb-[2rem]">
            Deseja realmente solicitar o cancelamento da turma ?
          </p>
          <p><span className="font-bold">Disciplina: </span>{curso}</p>
          <p><span className="font-bold">Periodo/Ano: </span> {periodo}/{ano}</p>
        </div>
        <div className="flex gap-4 bg-red-500 w-[100%] rounded-b-[1rem] justify-end p-[0.5rem]">
          <button
            onClick={fecharTrancamento}
            className="bg-white p-2 text-black rounded-[0.5rem] border-[1px] border-black"
          >
            Cancelar
          </button>
          <button onClick={enviarSolicitacao} className="bg-red-700 p-2 rounded-[0.5rem] text-white">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
