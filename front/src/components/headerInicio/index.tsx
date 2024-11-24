import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header({ selecionado }: { selecionado: string }) {
  return (
    <header className="flex h-24 list-none flex-row items-center justify-between bg-[rgb(0,17,61)] p-[1.5rem] text-[1.8rem] text-white">
      <img src={logo} alt="Logo Unifei" className="w-[120px]" />

      <ul className="flex gap-6">
        <li
          className={`hover:text-blue-700 ${selecionado === "home" && "text-blue-700"}`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`hover:text-blue-700 ${selecionado === "sobre" && "text-blue-700"}`}
        >
          <Link to="/sobre">Sobre</Link>
        </li>
        <li className={`hover:text-blue-700`}>
          <a target="_blank" href="https://unifei.edu.br/">
            Unifei
          </a>
        </li>
      </ul>
    </header>
  );
}
