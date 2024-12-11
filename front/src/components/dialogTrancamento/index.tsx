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

  const enviarSolicitacao = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita o reload da página
    console.log("Enviando solicitação de trancamento");
  };

  const fecharTrancamento = (e: React.MouseEvent) => {
    e.preventDefault(); // Apenas evita comportamento padrão, por precaução
    onClose(false); // Fecha o modal sem enviar nada
  };

  return (
    <div className="absolute right-1/2 top-0 flex h-screen w-screen translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="flex h-[20rem] w-[40rem] flex-col items-center justify-between rounded-[1rem] bg-white">
        <div className="w-[100%] rounded-t-[1rem] bg-red-500">
          <h2 className="p-[1rem] text-left text-xl text-white">
            Solicitar cancelamento de turma
          </h2>
        </div>
        <div className="flex flex-col self-start p-[1rem]">
          <p className="pb-[2rem]">
            Deseja realmente solicitar o cancelamento da turma ?
          </p>
          <p>
            <span className="font-bold">Disciplina: </span>
            {curso}
          </p>
          <p>
            <span className="font-bold">Periodo/Ano: </span> {periodo}/{ano}
          </p>
        </div>
        <div className="flex w-[100%] justify-end gap-4 rounded-b-[1rem] bg-red-500 p-[0.5rem]">
          <button
            onClick={fecharTrancamento}
            className="rounded-[0.5rem] border-[1px] border-black bg-white p-2 text-black"
          >
            Cancelar
          </button>
          <button
            onClick={enviarSolicitacao}
            className="rounded-[0.5rem] bg-red-700 p-2 text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
