import React, { useEffect, useState } from "react";
import Header from "../../components/headerInicio";
import unifei from "../../assets/unifeiImagem.jpg";
import logo from "../../assets/logoEngrenagem.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const [formData, setFormData] = useState({
    matricula: "",
    senha: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      matricula: formData.matricula,
      senha: formData.senha,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página.
    try {
      const response = await axios.post(
        "http://localhost:3200/users/login",
        formData,
      );

      if (!response.data.status) {
        return;
      }

      sessionStorage.setItem("token", response.data.token); // Armazena o token JWT

      navigate("/inicio");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-backgroundLinear">
      <Header selecionado="home" />
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <div className="flex h-[30rem] w-[60rem] overflow-hidden rounded-3xl bg-white">
          <div className="h-full w-1/2">
            <img
              src={unifei}
              alt="imagem da unifei"
              className="h-full w-full"
            />
          </div>
          <div className="flex w-full flex-1 flex-col items-center gap-5 p-3">
            <img
              src={logo}
              alt="logo Engrenagem"
              className="h-[130px] w-[130px]"
            />
            <form
              className="flex w-full flex-col items-center justify-center gap-5"
              onSubmit={onSubmit}
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <label className="font" htmlFor="matricula">
                  Usuário
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  name="matricula"
                  id="matricula"
                  placeholder="Digite sua Matrícula"
                  value={formData.matricula}
                  onChange={handleChange}
                />
                <label htmlFor="senha">Senha</label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="backgroundInput w-1/2 rounded-3xl text-center"
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Digite a senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
                <Link className="mt-2 text-xs text-blue-500" to="/esqueceu">
                  Esqueceu a senha?
                </Link>
              </div>
              <button
                className="h-9 w-36 rounded-3xl bg-[#314894] text-white"
                type="submit"
              >
                ENTRAR
              </button>
            </form>

            <div className="flex h-1 w-[90%] rounded-full bg-zinc-300"></div>

            <div className="text-center">
              <p className="font-bold">Aluno</p>
              <Link className="text-blue-500" to="/cadastro">
                Cadastrar-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
