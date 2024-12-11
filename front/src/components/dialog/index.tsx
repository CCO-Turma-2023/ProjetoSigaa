import { useState } from "react";

interface propDialog {
  title: string;
  description: string;
  onClose: (rota: any) => void;
  eventDate: string;
}

export default function DialogData({
  title,
  description,
  onClose,
  eventDate,
}: propDialog) {
  return (
    <div className="fixed right-1/2 top-1/2 z-50 flex h-96 w-96 translate-x-1/2 flex-col items-center justify-between rounded-md bg-white p-5">
      <div className="flex gap-1 text-black">
        <span className="font-bold">Data: </span>
        <span>{eventDate}</span>
      </div>
      <div className="flex gap-1 text-black">
        <span className="font-bold text-black">Evento:</span>
        <span className="text-black">{title}</span>
      </div>
      <div className="flex gap-1 text-black">
        <span className="font-bold text-black">Descrição: </span>
        <span className="text-black">{description} </span>
      </div>
      <button
        onClick={() => {
          onClose(false);
        }}
        className="h-12 w-1/3 rounded-lg bg-blue-950 text-center text-white"
      >
        Fechar
      </button>
    </div>
  );
}
