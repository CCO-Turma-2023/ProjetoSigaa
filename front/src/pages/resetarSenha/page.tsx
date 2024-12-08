import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetarSenha = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token"); // Obtém o token da URL

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/");
      }

      try {
        const response = await axios.get(
          "http://localhost:3200/users/checkToken",
          {
            data: token,
          },
        );

        if (response.data.status) {
        }
      } catch (error) {
        console.log("teste");
      }

    };
    verifyToken();
  }, []);


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não coinhecidem");
      return;
    }

    if (novaSenha === "" || confirmarSenha === "") {
      toast.error("As senhas não podem ser vazias!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3200/users/mudarSenha",
        {
          token,
          novaSenha,
        },
      );
      if (response.status === 200) {
        toast.success("Senha alterada com sucesso!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Não foi possível alterar a senha");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-center gap-3 border border-white p-5">
        <h1 className="text-2xl text-white">Redefinir Senha</h1>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <label htmlFor="novaSenha">Nova Senha:</label>
            <input
              type="password"
              id="novaSenha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
            <input
              type="password"
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>
          <button
            className="rounded-xl bg-blue-600 p-2 font-bold text-white"
            type="submit"
          >
            Redefinir Senha
          </button>
        </form>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="rounded-xl bg-red-600 p-2 font-bold text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ResetarSenha;
