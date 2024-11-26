import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/headerInicio";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório."),
  email: yup
    .string()
    .email("Insira um email válido.")
    .required("O email é obrigatório."),
  matricula: yup.string().required("O número de matrícula é obrigatório."),
  senha: yup
    .string()
    .required("A senha é obrigatória.")
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .matches(/\d/, "A senha deve conter pelo menos um número.")
    .matches(
      /[@$!%*?&]/,
      "A senha deve conter pelo menos um caractere especial.",
    ),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas não correspondem.")
    .required("A confirmação de senha é obrigatória."),
});

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3200/users/cadastro",
        data,
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
        <div className="flex h-[40rem] w-[40rem] overflow-hidden rounded-3xl bg-white">
          <div className="flex w-full flex-1 flex-col items-center justify-center p-3">
            <form
              className="flex w-full flex-col items-center justify-center gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                {/* Nome */}
                <label className="font" htmlFor="nome">
                  Nome Completo
                </label>
                <input
                  {...register("nome")}
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  id="nome"
                  placeholder="Digite o Nome"
                />
                {errors.nome && (
                  <p className="text-red-500">{errors.nome.message}</p>
                )}

                {/* Email */}
                <label className="font mt-4" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email")}
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="email"
                  id="email"
                  placeholder="Digite o Email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                {/* Matrícula */}
                <label className="font mt-4" htmlFor="matricula">
                  Nº Matricula
                </label>
                <input
                  {...register("matricula")}
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  id="matricula"
                  placeholder="Número de Matrícula"
                />
                {errors.matricula && (
                  <p className="text-red-500">{errors.matricula.message}</p>
                )}

                {/* Senha */}
                <label className="mt-4" htmlFor="senha">
                  Senha
                </label>
                <input
                  {...register("senha")}
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="password"
                  id="senha"
                  placeholder="Digite a Senha"
                />
                {errors.senha && (
                  <p className="text-red-500">{errors.senha.message}</p>
                )}

                {/* Confirmar Senha */}
                <label className="mt-4" htmlFor="confirmarSenha">
                  Confirmar Senha
                </label>
                <input
                  {...register("confirmarSenha")}
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="password"
                  id="confirmarSenha"
                  placeholder="Digite a Senha"
                />
                {errors.confirmarSenha && (
                  <p className="text-red-500">
                    {errors.confirmarSenha.message}
                  </p>
                )}
              </div>

              {/* Botões */}
              <button
                className="mt-4 h-9 w-36 rounded-3xl bg-[#314894] text-white"
                type="submit"
              >
                CADASTRAR
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
