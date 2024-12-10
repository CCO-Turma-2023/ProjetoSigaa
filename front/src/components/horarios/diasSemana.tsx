export default function DiasSemana({ dia }: { dia: string }) {
  return (
    <div
      className={`flex h-8 items-center justify-center sm:w-14 sm:text-xs lg:w-24 lg:text-[0.9rem]`}
    >
      <span className="text-white">{dia}</span>
    </div>
  );
}
