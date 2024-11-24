export default function DiasSemana({ dia }: { dia: string }) {
  return (
    <div className={`flex h-10 w-20 items-center justify-center`}>
      <span className="text-white">{dia}</span>
    </div>
  );
}
