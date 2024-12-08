import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/headerInicio";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";

const schema = z
  .object({
    nome: z.string().nonempty("O nome é obrigatório."),
    email: z
      .string()
      .email("Insira um email válido.")
      .nonempty("O email é obrigatório."),
    matricula: z.string().nonempty("O número de matrícula é obrigatório.")
      .regex(/[0-9]/, "A matrícula deve ser composta por números"),
    senha: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
      .regex(/\d/, "A senha deve conter pelo menos um número.")
      .regex(
        /[@$!%*?&]/,
        "A senha deve conter pelo menos um caractere especial.",
      ),
    confirmarSenha: z
      .string()
      .nonempty("A confirmação de senha é obrigatória."),
  })
  .superRefine((data, ctx) => {
    if (data.senha !== data.confirmarSenha) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmarSenha"], // Define onde o erro será exibido
        message: "As senhas não correspondem.",
      });
    }
  });

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");


  const alterarValorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const id = e.target.id;
    const valor = e.target.value;

    if (id === "nome") {
      setNome(valor);
    } else if (id === "email") {
      setEmail(valor);
    } else if (id === "matricula") {
      setMatricula(valor)
    } else if (id === "senha") {
      setSenha(valor);
    } else {
      setConfirmarSenha(valor);
    }

    return;
  }

  
  const validaUsuario = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      nome: nome,
      email: email,
      matricula: matricula,
      senha: senha,
      confirmarSenha: confirmarSenha,
    }

    const result = schema.safeParse(data);

    if (!result.success){
      toast.error(result.error.errors[0].message)
      return;
    }

    // Campos Válidos   
    onSubmit(data); 
  }


  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3200/users/cadastro",
        data,
      );

      if (!response.data.status) {
        toast.error("Dados já utilizados ou incorretos!");
        return;
      }

      toast.success("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao enviar os dados!");
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
              onSubmit={validaUsuario}
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">

                <label className="font" htmlFor="nome">
                  Nome Completo
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  id="nome"
                  placeholder="Digite o Nome"
                  onChange={alterarValorInput}
                />

                <label className="font mt-4" htmlFor="email">
                  Email
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="email"
                  id="email"
                  placeholder="Digite o Email"
                  onChange={alterarValorInput}
                />

                <label className="font mt-4" htmlFor="matricula">
                  Nº Matricula
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  id="matricula"
                  placeholder="Número de Matrícula"
                  onChange={alterarValorInput}
                />

                <label className="mt-4" htmlFor="senha">
                  Senha
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="password"
                  id="senha"
                  placeholder="Digite a Senha"
                  onChange={alterarValorInput}
                />

                <label className="mt-4" htmlFor="confirmarSenha">
                  Confirmar Senha
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="password"
                  id="confirmarSenha"
                  placeholder="Digite a Senha"
                  onChange={alterarValorInput}
                />
              </div>

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
