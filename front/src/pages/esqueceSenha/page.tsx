import React, { useState } from "react";
import Header from "../../components/headerInicio";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Senha() {
  const [formData, setFormData] = useState({
    email: "",
    matricula: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      email: formData.email,
      matricula: formData.matricula,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página.

    if (formData.email === "" || formData.matricula === "") {
      toast.warning("Campos Vazios\n");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3200/users/esqueceu",
        formData,
      );
      toast.success("Email enviado!");
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      toast.error("Dados Incorretos");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-backgroundLinear">
      <Header selecionado="home" />
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <div className="flex h-[25rem] w-[40rem] overflow-hidden rounded-3xl bg-white">
          <div className="flex w-full flex-1 flex-col items-center justify-center p-3">
            <form
              className="flex w-full flex-col items-center justify-center gap-5"
              onSubmit={onSubmit}
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                {/* Email */}
                <label className="font mt-4" htmlFor="email">
                  Email
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="email"
                  name="email"
                  value={formData.email}
                  id="email"
                  placeholder="Digite o Email"
                  onChange={handleChange}
                />

                {/* Matrícula */}
                <label className="font mt-4" htmlFor="matricula">
                  Nº Matricula
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  name="matricula"
                  id="matricula"
                  value={formData.matricula}
                  placeholder="Número de Matrícula"
                  onChange={handleChange}
                />
              </div>

              {/* Botões */}
              <button
                className="mt-4 h-9 w-36 rounded-3xl bg-[#314894] text-white"
                type="submit"
              >
                RECUPERAR
              </button>
            </form>
            <button className="mt-4 h-9 w-36 rounded-3xl bg-[#314894] text-white">
              <Link to="/">CANCELAR</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
