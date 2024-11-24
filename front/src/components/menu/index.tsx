import { useEffect, useState } from "react";
import userImage from "../../assets/user.png";
import { FaRegNewspaper } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import { HiAcademicCap } from "react-icons/hi2";
import BotoesNav from "../botoesNav";
import { HiOutlineLogout } from "react-icons/hi";
import SubMenu from "../submenu";

export default function Menu() {
  const [userIcon, setUserIcon] = useState(userImage);
  const [isSelected, setSelected] = useState("");
  const [user, setUser] = useState({
    nome: "LIONEL MESSI",
    matricula: "2025001009",
    curso: "CIÊNCIA DA COMPUTAÇÃO",
  });

  const [estado, setEstado] = useState(false);

  useEffect(() => {
    defineSelected(window.location.pathname);
  }, []);

  const defineSelected = (prop: string) => {
    if (
      prop === "/disciplina" ||
      prop === "/turma" ||
      prop === "/historico" ||
      prop === "/matricula"
    ) {
      setEstado(!estado);
      setSelected("/disciplina");
      return;
    }
    setEstado(false);
    setSelected(prop);
  };

  return (
    <nav className="flex min-h-screen w-64 min-w-64 flex-col items-center gap-5 bg-[#00113D]">
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white">
          <img src={userIcon} alt="userIcon" className="w-[80px]" />
        </div>
        <div className="flex h-36 w-full flex-col items-center justify-center gap-2 bg-[#00002b] p-[1rem] text-center text-sm font-bold">
          <span className="text-white">{user.nome}</span>
          <span className="mt-2 text-white">{user.matricula}</span>
          <span className="mt-2 text-white">{user.curso}</span>
        </div>
      </div>
      <div className="h-1 w-5/6 rounded-full bg-white"></div>
      <div className="flex w-full flex-col gap-2">
        <BotoesNav
          rota={"/inicio"}
          name={"Início"}
          icon={HiHome}
          defineSelected={defineSelected}
          isSelected={isSelected}
        />
        <BotoesNav
          rota={"/disciplina"}
          name={"Disciplinas"}
          icon={HiAcademicCap}
          defineSelected={defineSelected}
          isSelected={isSelected}
        />

        {estado && <SubMenu />}
        <BotoesNav
          rota={"/indices"}
          name={"Indices"}
          icon={FaRegNewspaper}
          defineSelected={defineSelected}
          isSelected={isSelected}
        />
        <BotoesNav
          rota={"/"}
          name={"Sair"}
          icon={HiOutlineLogout}
          defineSelected={defineSelected}
          isSelected={isSelected}
        />
      </div>
    </nav>
  );
}
