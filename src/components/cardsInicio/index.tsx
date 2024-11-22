import Link from "next/link";
import Image from "next/image";
import { ComponentType, useState } from "react";

export interface PropsCards {
  icon: ComponentType;
  titulo: string;
  texto: string;
  color: string;
}

export default function CardsInicio({
  icon: Icon,
  titulo,
  texto,
  color,
}: PropsCards) {
  return (
    <div className="flex h-[7rem] w-72 bg-white">
      <div
        style={{ backgroundColor: color }}
        className={`flex flex-col items-center justify-center p-[1.5rem]`}
      >
        <div className="text-4xl">
          <Icon />
        </div>
      </div>
      <div className="flex flex-col pl-[0.5rem] pt-[0.25rem]">
        <p className="uppercase">{titulo}</p>
        <p className="font-bold">{texto}</p>
      </div>
    </div>
  );
}
