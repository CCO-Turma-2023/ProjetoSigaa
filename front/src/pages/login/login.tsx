import Header from "../../components/headerInicio";
import unifei from "../../assets/unifeiImagem.jpg";
import logo from "../../assets/logoEngrenagem.png";
import { Link } from "react-router-dom";
import "./login.css";

export default function Home() {
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
              action="post"
              method="http://localhost:3200/login"
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <label className="font" htmlFor="usuario">
                  Usuário
                </label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="w-1/2 rounded-3xl text-center"
                  type="text"
                  name="usuario"
                  id="usuario"
                  placeholder="Digite o Usuário"
                />
                <label htmlFor="senha">Senha</label>
                <input
                  style={{ backgroundColor: "rgb(212, 212, 216)" }}
                  className="backgroundInput w-1/2 rounded-3xl text-center"
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Digite a senha"
                />
                <Link
                  className="mt-2 text-xs text-blue-500"
                  to="https://pbs.twimg.com/media/GUpZVNLXAAAia1R.jpg"
                >
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

            <div className="flex w-[90%] justify-between">
              <div className="text-center">
                <p className="font-bold">Professor ou Funcionário</p>
                <Link className="text-blue-500" to="/cadastro">
                  Cadastrar-se
                </Link>
              </div>
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
    </div>
  );
}
