import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface criarEvento {
  fecharComponenteEditavel: (bool: boolean) => void;
  evento: any | null;
  todosEvents: any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function DialogEditarEvento({
  fecharComponenteEditavel,
  todosEvents,
  setEvents,
  evento,
}: criarEvento) {
  const [nomeEvento, setNomeEvento] = useState<string>(evento.title);
  const [descricaoEvento, setDescricaoEvento] = useState<string>(
    evento.description,
  );

  const alterarValorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const valor = e.target.value;

    if (id === "nomeEvento") {
      setNomeEvento(valor);
    } else if (id === "descricaoEvento") {
      setDescricaoEvento(valor);
    }
  };

  const salvarInfos = async () => {
    try {
      if (nomeEvento === "" || descricaoEvento === "") {
        toast.error("Os campos estão vazios!");
        return;
      }
      const response = await axios.put(
        "http://localhost:3200/eventos/editarEvento",
        {
          nomeAntigo: evento.title,
          nomeEvento,
          descricaoEvento,
        },
      );

      const todosEventoss = todosEvents.map((event) => {
        if (event.title === evento.title) {
          return {
            ...event,
            description: descricaoEvento,
            title: nomeEvento,
          };
        }
        return event;
      });

      // Atualiza o estado com os eventos modificados
      setEvents(todosEventoss);

      fecharComponenteEditavel(true);
      toast.success("Evento editado com sucesso!");
    } catch (error) {
      toast.error("Erro no servidor! Por favor, tente mais tarde!");
      console.error(error);
    }
  };

  const deletarEvento = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3200/eventos/deletarEvento",
        {
          params: { nomeEvento }, // Envia 'nomeEvento' como parte dos parâmetros
        },
      );

      let todosEventos = todosEvents.filter((j) => j.title !== nomeEvento);

      setEvents(todosEventos);
      localStorage.removeItem("events");
      fecharComponenteEditavel(true);
      toast.success("Evento deletado com sucesso!");
    } catch (error) {
      toast.error("Erro no servidor! Por favor, tente mais tarde!");
      console.error(error);
    }
  };

  return (
    <div className="absolute right-1/2 top-0 z-50 flex h-screen w-screen translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-between bg-white p-5">
        <p className="text-3xl font-bold">Adicionar Evento</p>

        <label className="font mt-4" htmlFor="nomeEvento">
          Evento
        </label>
        <input
          style={{ backgroundColor: "rgb(212, 212, 216)" }}
          className="w-1/2 rounded-3xl text-center"
          type="text"
          id="nomeEvento"
          value={nomeEvento}
          placeholder="Digite o nome do evento"
          onChange={alterarValorInput}
        />

        <label className="font mt-4" htmlFor="descricaoEvento">
          Descrição
        </label>
        <input
          style={{ backgroundColor: "rgb(212, 212, 216)" }}
          className="w-1/2 rounded-3xl text-center"
          type="text"
          id="descricaoEvento"
          value={descricaoEvento}
          placeholder="Descreva o evento"
          onChange={alterarValorInput}
        />

        <div className="flex gap-3 font-bold">
          <button
            onClick={() => {
              deletarEvento();
            }}
            className="w-24 bg-black p-3 text-white"
          >
            Remover
          </button>
          <button
            onClick={() => {
              fecharComponenteEditavel(true);
            }}
            className="w-24 bg-red-500 p-3"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              salvarInfos();
            }}
            className="w-24 bg-green-500 p-3"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
