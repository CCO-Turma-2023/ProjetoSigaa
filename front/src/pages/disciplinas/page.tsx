import { useEffect, useState } from "react";
import Disciplina from "../../components/disciplina";
import { PropsDisciplina } from "../../components/disciplina";
import axios from "axios";

export default function Turma() {
  const [turmasAtuais, setTurmasAtuais] = useState([]);
  const disciplinas = {};

  useEffect(() => {
    const getTurma = async () => {
      const verifyStorage = localStorage.getItem("turmas");
      if (verifyStorage) {
        console.log(verifyStorage);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3200/users/getTurmas",
        );

        if (response.data.status) {
          localStorage.setItem("turmas", response.data.turmas);
        }
      } catch (error) {}
    };
    getTurma();

    /* localStorage.setItem("token", response.data.token); // Armazena o token JWT */
  }, []);

  return (
    <div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div className="m-[2rem] h-[90%] w-[95%] overflow-x-auto bg-white p-3">
        <h1 className="m-[1rem] text-3xl">Turmas Atuais</h1>
        <div className="m-[1.2rem] flex flex-col gap-4 overflow-auto">
          {disciplinas.map((disc: PropsDisciplina, index: React.Key) => {
            return <Disciplina key={index} disciplina={disc} />;
          })}
        </div>
      </div>
    </div>
  );
}
