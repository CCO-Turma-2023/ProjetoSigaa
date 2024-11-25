import image from "../../assets/endpoint.png";
import Header from "../../components/headerInicio";

export default function NotFound() {
  return (
    <div className="flex h-screen min-h-screen w-screen flex-col gap-4 bg-backgroundLinear sm:h-screen md:h-screen lg:h-screen">
      <Header selecionado="" />
      <div className="flex w-full flex-col items-center justify-center gap-11">
        <img src={image} alt="coruja molhada" className="w-96" />
        <h1 className="font-bold text-white sm:text-lg md:text-xl lg:text-6xl">
          PÁGINA NÃO ENCONTRADA 404
        </h1>
      </div>
    </div>
  );
}
