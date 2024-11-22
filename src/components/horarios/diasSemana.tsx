export default function DiasSemana({ dia }: { dia: string }) {
  return (
    <div
      className={`flex h-10 w-[6.8rem] items-center justify-center bg-black`}
    >
      <span className="text-white">{dia}</span>
    </div>
  );
}
