import { ComponentType, useState } from "react";
import { Link } from "react-router-dom";

export interface PropsBotoes {
  rota: string;
  name: string;
  icon: ComponentType;
  defineSelected: (rota: string) => void;
  isSelected: string;
}

export default function BotoesNav({
  rota,
  name,
  icon: Icon,
  defineSelected,
  isSelected,
}: PropsBotoes) {
  return (
    <div>
      <div
        className={`flex h-10 w-full gap-4 ${isSelected === rota ? "text-[#ffffff]" : "text-[#b3b5b7]"}`}
      >
        {isSelected === rota ? (
          <div className="h-full w-1 bg-blue-500" />
        ) : (
          <div className="h-full w-1" /> /* Adicionar uma BOX invísivel para todos ficarem alinhados */
        )}

        {rota === "/disciplina" ? (
          <button
            onClick={() => {
              defineSelected(rota);
            }}
            className="flex items-center gap-2"
          >
            <Icon />
            {name}
          </button>
        ) : (
          <Link
            onClick={() => {
              defineSelected(rota);
            }}
            className="flex items-center gap-2"
            to={rota}
          >
            <Icon />
            {name}
          </Link>
        )}
      </div>
    </div>
  );
}
