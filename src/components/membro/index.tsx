"use client";
import Image from "next/image";
import user from "../../assets/user.png";
import "../../app/globals.css";
import Link from "next/link";

interface membros {
  matricula: string;
  nome: string;
}

export default function Membro({ matricula, nome }: membros) {
  return (
    <div className="h-50 mt-4 flex w-72 flex-col text-center">
      <span className="text-[rgba(0, 0, 0, 1)]">{matricula}</span>
      <span className="text-[rgba(0, 0, 0, 1)]">{nome}</span>
      <div className="flex justify-center">
        <Image src={user} alt="Membro" width={100}></Image>
      </div>
    </div>
  );
}
