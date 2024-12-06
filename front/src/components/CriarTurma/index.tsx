import { useState } from "react";

export interface propsCriarTurma {
  onClose: (aux: boolean) => void;
}

export default function CriarTurma({ onClose }: propsCriarTurma) {
  const enviarSolicitacao = (e: React.MouseEvent) => {};

  const fecharTrancamento = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose(false);
  };

  return (
    <div className="absolute -top-0 right-1/2 flex h-[100vh] w-[100vw] translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="h-[70%] w-[50%] rounded-[1rem] bg-white">
        <h1 className="rounded-t-[0.5rem] bg-green-700 p-[1rem] text-start text-3xl text-white">
          Criar turma
        </h1>

        <form action="">
          <div className="flex flex-col gap-[1rem]">
            <p className="text-center text-2xl">Turno</p>
            <div className="flex justify-center gap-[1rem]">
              <div>
                <input
                  type="radio"
                  name="turno"
                  id="Matutino"
                  value="Matutino"
                />
                <label htmlFor="turno">Matutino</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="turno"
                  id="Vespertino"
                  value="Vespertino"
                />
                <label htmlFor="turno">Vespertino</label>
              </div>

              <div>
                <input type="radio" name="turno" id="Noturno" value="Noturno" />
                <label htmlFor="turno">Noturno</label>
              </div>
            </div>
          </div>
        </form>
        <button
          className="w-1/5 rounded-[0.5rem] bg-red-500"
          onClick={() => {
            onClose(false);
          }}
        >
          {" "}
          Fechar
        </button>
      </div>
    </div>
  );
}
