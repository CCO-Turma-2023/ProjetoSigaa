import user from "../../assets/user.png";

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
        <img src={user} alt="Membro" className="w-[100px]" />
      </div>
    </div>
  );
}
