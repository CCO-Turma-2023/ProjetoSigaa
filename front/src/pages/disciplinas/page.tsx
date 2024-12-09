import { useEffect, useState } from "react";
import Disciplina from "../../components/disciplina";
import axios, { AxiosRequestConfig } from "axios";
import Menu from "../../components/menu/index.tsx";
import { toast } from "react-toastify";
import { User } from "../../pages/inicio/page";
import { useNavigate } from "react-router-dom";
import DecodificarToken from "../../utils/tokenDecode";
import { propTurmas } from "../listarTurmas/page.tsx";

export default function Turma() {
  const [turmasAtuais, setTurmasAtuais] = useState<propTurmas[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pegarTurmas = async () => {
      let usuario: User | null = DecodificarToken();

      if (usuario === null) {
        navigate("/");
        return <></>;
      }

      const config: AxiosRequestConfig = {
        headers: {
          ids: usuario.turmas,
        },
      };
      console.log(usuario);
      try {
        const response = await axios.get(
          "http://localhost:3200/users/pegarTurmas",
          config,
        );

        for (let i = 0; i < response.data.turmas.length; i++) {
          response.data.turmas[i].horarios =
            response.data.turmas[i].horarios.split(",");
          response.data.turmas[i].horarios.pop(
            response.data.turmas[i].horarios.length - 1,
          );
        }

        setTurmasAtuais(response.data.turmas);
      } catch (errors) {
        console.error("Erro ao pegar as turmas.");
      }
    };
    pegarTurmas();
  }, []);

  return (
    <div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div className="m-[2rem] h-[90%] w-[95%] overflow-x-auto bg-white p-3">
        <h1 className="m-[1rem] text-3xl">Turmas Atuais</h1>
        <div className="m-[1.2rem] flex flex-col gap-4 overflow-auto">
          <div className="m-[1.2rem] flex flex-col gap-4 overflow-auto">
            {turmasAtuais.map((disc: propTurmas, index: React.Key) => {
              return <Disciplina key={index} disciplina={disc} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
