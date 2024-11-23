import { useState } from "react";

interface PropsDialogTrancamento {
  curso: string;
  onClose: (rota: boolean) => void; // Boolean para indicar se fecha ou não
}

export default function DialogTrancarCurso({
  curso,
  onClose,
}: PropsDialogTrancamento) {
  const [senha, setSenha] = useState("");

  const enviarSolicitacao = (e: React.FormEvent) => {
    e.preventDefault(); // Evita o reload da página
    console.log("Enviando trancamento com senha:", senha);
    // Aqui você pode adicionar a lógica para validar e enviar a solicitação
    if (senha.length > 6) {
      console.log("Trancamento enviado com sucesso");
      onClose(false);
    } else {
      alert("Coloque uma senha válida");
    }
  };

  const fecharTrancamento = (e: React.MouseEvent) => {
    e.preventDefault(); // Apenas evita comportamento padrão, por precaução
    onClose(false); // Fecha o modal sem enviar nada
  };

  return (
    <div className="absolute -top-0 right-1/2 flex h-[100vh] w-[100vw] translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.98)]">
      <div className="flex h-[40rem] w-[40rem] flex-col items-center justify-between rounded-[1rem] bg-white p-5">
        <h2 className="text-center text-2xl font-bold">
          Você tem certeza que gostaria de trancar o curso de {curso}?
        </h2>
        <p>
          Se você quiser proceder com esta ação, saiba que, se aprovado, será
          irreversível!
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <form
            className="flex flex-col gap-3 text-center"
            onSubmit={enviarSolicitacao}
          >
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              className="bg-gray-500 p-2"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button type="submit" className="bg-red-500 p-2 text-white">
              Solicitar Trancamento
            </button>
          </form>
          <button
            onClick={fecharTrancamento}
            className="bg-green-800 p-2 text-white"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
