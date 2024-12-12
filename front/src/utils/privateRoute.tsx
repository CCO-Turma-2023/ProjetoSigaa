import {useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context";
import Menu from "../components/menu"
import DecodificarToken from "../utils/tokenDecode"
import { User } from "../pages/inicio/page"


const rotasCoordenador = ["/listarTurmas"];

// Rotas que são exclusivas à alunos
const rotasAluno = ["/matricula", "/turma"];

const PrivateRoute = () => {
  const { validaAcesso, isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation()

  const rota = location.pathname;

  useEffect(() => {
    validaAcesso(); 
  }, [location]);

  if (loading) {
    return <div>Carregando...</div>; 
  }

  if(!isAuthenticated){
    return <Navigate to="/" replace /> 
  }

  let usuario: User | null = DecodificarToken();

  if (!rotasCoordenador.includes(rota) && usuario?.type !== 1) {
    return(
      <div className="flex">
        <Menu />
        <Outlet />
      </div>
    )
  }

  // Verificando se não é coordenador
  if (usuario?.type !== 1) {
    return(
      <Navigate to="/inicio" replace /> 
    )
  }

  // Caso não seja um rota exclusiva para aluno
  return !rotasAluno.includes(rota) ? ( 
    <div className="flex">
      <Menu />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/inicio" replace /> 
  );
};

export default PrivateRoute;
