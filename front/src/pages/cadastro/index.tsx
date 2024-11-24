import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/headerInicio";
import axios from "axios";

interface FormValues {
  nome: string;
  email: string;
  matricula: string;
  senha: string;
  confirmarSenha: string;
}

interface Errors {
  nome?: string;
  email?: string;
  matricula?: string;
  senha?: string;
  confirmarSenha?: string;
}

export default function Cadastro() {
  const [formValues, setFormValues] = useState<FormValues>({
    nome: "",
    email: "",
    matricula: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "senha") {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password: string) => {
    let strength = "Fraca";
    const regexStrong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (regexStrong.test(password)) {
      strength = "Forte";
    } else if (regexMedium.test(password)) {
      strength = "Média";
    }
    setPasswordStrength(strength);
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formValues.nome.trim()) newErrors.nome = "O nome é obrigatório.";
    if (!formValues.email.trim()) newErrors.email = "O email é obrigatório.";
    if (!formValues.matricula.trim())
      newErrors.matricula = "O número de matrícula é obrigatório.";
    if (!formValues.senha.trim()) newErrors.senha = "A senha é obrigatória.";
    if (formValues.senha !== formValues.confirmarSenha)
      newErrors.confirmarSenha = "As senhas não correspondem.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3200/cadastro", {
          formValues,
        });
        console.log("Resposta do servidor:", response.data);
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      }
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
              onSubmit={handleSubmit}
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <label className="font" htmlFor="nome">
                  Nome Completo
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Digite o Nome"
                  value={formValues.nome}
                  onChange={handleChange}
                />
                {errors.nome && <p className="text-red-500">{errors.nome}</p>}

                <label className="font mt-4" htmlFor="email">
                  Email
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Digite o Email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <label className="font mt-4" htmlFor="matricula">
                  Nº Matricula
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  name="matricula"
                  id="matricula"
                  placeholder="Número de Matricula"
                  value={formValues.matricula}
                  onChange={handleChange}
                />
                {errors.matricula && (
                  <p className="text-red-500">{errors.matricula}</p>
                )}

                <label className="mt-4" htmlFor="senha">
                  Senha
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Digite a senha"
                  value={formValues.senha}
                  onChange={handleChange}
                />
                {errors.senha && <p className="text-red-500">{errors.senha}</p>}
                <p className="mt-1 text-sm">
                  Nível da senha: {passwordStrength}
                </p>

                <label className="mt-4" htmlFor="confirmarSenha">
                  Confirmar Senha
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="password"
                  name="confirmarSenha"
                  id="confirmarSenha"
                  placeholder="Digite a senha"
                  value={formValues.confirmarSenha}
                  onChange={handleChange}
                />
                {errors.confirmarSenha && (
                  <p className="text-red-500">{errors.confirmarSenha}</p>
                )}
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
