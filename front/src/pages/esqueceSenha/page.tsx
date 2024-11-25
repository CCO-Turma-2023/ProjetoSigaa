import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/headerInicio";
import { useForm, SubmitHandler } from "react-hook-form"; // Importando SubmitHandler para tipagem
import axios from "axios";

// Tipagem dos dados do formulário
interface IFormInput {
  email: string;
  matricula: string;
}

export default function Senha() {
  // Inicializa o react-hook-form para gerenciar os dados do formulário
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  // Função de envio de dados para o backend
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Dados enviados:", data);
    try {
      // Envia a requisição POST para o backend
      const response = await axios.post(
        "http://localhost:3200/users/esqueceu",
        data
      );
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
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
              onSubmit={handleSubmit(onSubmit)} // Usa o handleSubmit do react-hook-form
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
                  id="email"
                  placeholder="Digite o Email"
                  {...register("email", { required: "Email é obrigatório" })} // Registra o campo email com validação
                />
                {errors.email && <span>{errors.email.message}</span>} {/* Exibe erro se houver */}

                {/* Matrícula */}
                <label className="font mt-4" htmlFor="matricula">
                  Nº Matricula
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  id="matricula"
                  placeholder="Número de Matrícula"
                  {...register("matricula", { required: "Matrícula é obrigatória" })} // Registra o campo matrícula com validação
                />
                {errors.matricula && <span>{errors.matricula.message}</span>} {/* Exibe erro se houver */}
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
