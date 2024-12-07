import { propTurmas } from "../../pages/listarTurmas/page";
import { FaRegCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DiscSolMatricula({ disc }: { disc: propTurmas }) {
  return (
    <div className="flex h-full w-full border-[1px] border-[#e3e3e3]">
      <div className="flex flex-col">
        <div className="flex">
          <h2 className="ml-2 mt-1 text-[1.2rem] text-[#28c2c0]">
            {disc.sigla} -
          </h2>
          <p className="ml-1 mt-2">{disc.nome}</p>
        </div>
        <div className="flex">
          {String(disc.periodo) !== "0" ? (
            <div className="w-2/8 ml-3 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
              {disc.periodo}° Semestre
            </div>
          ) : (
            <></>
          )}
          <div className="w-2/8 ml-1 mt-1 bg-[#e3e3e3] pl-[0.3rem] pr-[0.3rem] font-bold">
            {String(disc.periodo) === "0" ? "Optativa" : "Obrigatória"}
          </div>
        </div>
        <div className="mb-1 ml-3 mt-1 flex flex-col">
          <p className="flex items-center gap-[0.2rem]"> </p>
          <div className="flex flex-col">
            {disc.horarios.map((horario, index) => {
              return (
                <span key={index} className="flex items-center gap-1">
                  <FaRegCircle className="text-green-500" /> {horario}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
