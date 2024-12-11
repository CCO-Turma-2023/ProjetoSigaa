import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface DialogEventoProps {
  fecharComponente: (bool: boolean) => void;
  adicionarEventos?: (evento: any) => void;
  setEventos?: React.Dispatch<React.SetStateAction<any[]>>;
  todosEventos?: any[];
  evento?: any | null;
  data?: string;
  curso?: string;
}

export default function DialogEvento({
  fecharComponente,
  adicionarEventos,
  setEventos,
  todosEventos,
  evento,
  data,
  curso,
}: DialogEventoProps) {
  const [nomeEvento, setNomeEvento] = useState<string>(evento?.title || "");
  const [descricaoEvento, setDescricaoEvento] = useState<string>(
    evento?.description || "",
  );
  const [corEvento, setCorEvento] = useState<string>(
    evento?.color || "#000000",
  );

  const alterarValorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const valor = e.target.value;

    if (id === "nomeEvento") {
      setNomeEvento(valor);
    } else if (id === "descricaoEvento") {
      setDescricaoEvento(valor);
    } else if (id === "corEvento") {
      setCorEvento(valor);
    }
  };

  const salvarInfos = async () => {
    try {
      if (nomeEvento === "" || descricaoEvento === "") {
        toast.error("Os campos estão vazios!");
        return;
      }

      if (evento) {
        // Editar evento
        await axios.put("http://localhost:3200/eventos/editarEvento", {
          nomeAntigo: evento.title,
          nomeEvento,
          descricaoEvento,
          corEvento,
        });

        const eventosAtualizados = todosEventos?.map((event) => {
          if (event.title === evento.title) {
            return {
              ...event,
              title: nomeEvento,
              description: descricaoEvento,
              color: corEvento,
            };
          }
          return event;
        });

        setEventos?.(eventosAtualizados || []);
        localStorage.setItem("eventos", JSON.stringify(eventosAtualizados));
        toast.success("Evento editado com sucesso!");
      } else {
        // Criar evento
        await axios.post("http://localhost:3200/eventos/salvarEvento", {
          nomeEvento,
          descricaoEvento,
          corEvento,
          data,
          curso,
        });

        adicionarEventos?.({
          title: nomeEvento,
          date: data,
          color: corEvento,
          extendedProps: { type: descricaoEvento },
        });

        toast.success("Evento salvo com sucesso!");
      }

      fecharComponente(true);
    } catch (error) {
      toast.error("Erro no servidor! Por favor, tente mais tarde!");
      console.error(error);
    }
  };

  const deletarEvento = async () => {
    try {
      if (!evento) return;

      await axios.delete("http://localhost:3200/eventos/deletarEvento", {
        params: { nomeEvento: evento.title },
      });

      const novosEventos = todosEventos?.filter(
        (event) => event.title !== evento.title,
      );
      setEventos?.(novosEventos || []);
      localStorage.setItem("eventos", JSON.stringify(novosEventos));

      toast.success("Evento deletado com sucesso!");
      fecharComponente(true);
    } catch (error) {
      toast.error("Erro no servidor! Por favor, tente mais tarde!");
      console.error(error);
    }
  };

  return (
    <div className="absolute right-1/2 top-0 z-50 flex h-screen w-screen translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-between bg-white p-5">
        <p className="text-3xl font-bold">
          {evento ? "Editar Evento" : "Adicionar Evento"}
        </p>

        {data && <span>Data escolhida: {data}</span>}

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

        <label className="font mt-4" htmlFor="corEvento">
          Cor
        </label>
        <input
          style={{ backgroundColor: "rgb(212, 212, 216)" }}
          className="w-1/2 rounded-3xl text-center"
          type="color"
          id="corEvento"
          value={corEvento}
          onChange={alterarValorInput}
        />

        <div className="flex gap-3 font-bold">
          {evento && (
            <button
              onClick={deletarEvento}
              className="w-24 bg-black p-3 text-white"
            >
              Remover
            </button>
          )}
          <button
            onClick={() => fecharComponente(true)}
            className="w-24 bg-red-500 p-3"
          >
            Cancelar
          </button>
          <button onClick={salvarInfos} className="w-24 bg-green-500 p-3">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
