"use client"; // Este componente deve ser um Client Component
import { useEffect, useState } from "react";
import userImage from "../../assets/user.png";
import Image from "next/image";
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import { HiAcademicCap } from "react-icons/hi2";
import { HiMiniPresentationChartLine } from "react-icons/hi2";
import BotoesNav from "../botoesNav";
import { HiOutlineLogout } from "react-icons/hi";
import SubMenu from "../submenu";
import setCaminho from "../submenu";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [userIcon, setUserIcon] = useState(userImage);
  const [isSelected, setSelected] = useState("/inicio");
  const [user, setUser] = useState({
    nome: "LIONEL MESSI",
    matricula: "2025001009",
    curso: "CIÊNCIA DA COMPUTAÇÃO",
  });

  const [estado, setEstado] = useState(false);

  const [isPages] = useState([
    { rota: "/inicio", name: "Início", icon: HiHome },
    { rota: "/disciplinas/turma", name: "Disciplinas", icon: HiAcademicCap },
    { rota: "/indices", name: "Indices", icon: FaRegNewspaper },
    { rota: "/", name: "Sair", icon: HiOutlineLogout },
  ]);

  useEffect(() => {
    // Verifica o caminho apenas após o componente ser montado no cliente
    if (
      window.location.pathname !== "/sobre" &&
      window.location.pathname !== "/"
    ) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, []);

  const defineSelected = (prop: string) => {
    setSelected(prop);
    if (prop === "/") {
      setShowMenu(false);
    } else if (prop === "/disciplinas/turma") {
      setEstado(!estado);
      return;
    }
    setEstado(false);
  };

  return (
    <>
      {showMenu && (
        <nav className="flex min-h-screen w-64 min-w-64 flex-col items-center gap-5 bg-[#00113D]">
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-3">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white">
              <Image src={userIcon} alt="userIcon" width={80} height={80} />
            </div>
            <div className="flex h-36 w-full flex-col items-center justify-center gap-2 bg-[#00002b] p-[1rem] text-center text-sm font-bold">
              <span className="text-white">{user.nome}</span>
              <span className="mt-2 text-white">{user.matricula}</span>
              <span className="mt-2 text-white">{user.curso}</span>
            </div>
          </div>
          <div className="h-1 w-5/6 rounded-full bg-white"></div>
          <div className="flex w-full flex-col gap-2">
            {isPages.map((pages, index) => {
              return (
                <div key={index + 48}>
                  <BotoesNav
                    key={index}
                    rota={pages.rota}
                    name={pages.name}
                    icon={pages.icon}
                    defineSelected={defineSelected}
                    isSelected={isSelected}
                  />
                  {isSelected === "/disciplinas/turma" &&
                    pages.rota === "/disciplinas/turma" &&
                    estado && <SubMenu key={index + 25} />}
                </div>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
