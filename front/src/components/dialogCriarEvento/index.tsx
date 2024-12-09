import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface criarEvento {
  fecharComponente: (bool: boolean) => void;
  adicionarEventos: (prop: any) => any;
  data: string;
  curso: string | undefined;
}

export default function DialogCriarEvento({
  fecharComponente,
  adicionarEventos,
  data,
  curso,
}: criarEvento) {
  const [nomeEvento, setNomeEvento] = useState<string>("");
  const [descricaoEvento, setDescricaoEvento] = useState<string>("");
  const [corEvento, setCorEvento] = useState<string>("#000000");

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
      if (nomeEvento === "" || descricaoEvento === "" || corEvento === "") {
        toast.error("Os campos estão vazios!");
        return;
      }
      const response = await axios.post(
        "http://localhost:3200/eventos/salvarEvento",
        {
          nomeEvento,
          descricaoEvento,
          corEvento,
          data,
          curso,
        },
      );
      adicionarEventos({
        title: nomeEvento,
        date: data,
        color: corEvento,
        extendedProps: {
          type: descricaoEvento,
        },
      });

      console.log(response.status);

      fecharComponente(true);
      toast.success("Evento salvo com sucesso!");
    } catch (error) {
      toast.error("Erro no servidor! Por favor, tente mais tarde!");
      console.error(error);
    }
  };

  return (
    <div className="absolute right-1/2 top-0 z-50 flex h-screen w-screen translate-x-1/2 items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-between bg-white p-5">
        <p className="text-3xl font-bold">Adicionar Evento</p>

        <span>Data escolhida: {data}</span>

        <label className="font mt-4" htmlFor="nomeEvento">
          Evento
        </label>
        <input
          style={{ backgroundColor: "rgb(212, 212, 216)" }}
          className="w-1/2 rounded-3xl text-center"
          type="text"
          id="nomeEvento"
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
          placeholder="Digite a cor do evento"
          onChange={alterarValorInput}
        />

        <div className="flex gap-3 font-bold">
          <button
            onClick={() => {
              fecharComponente(true);
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
