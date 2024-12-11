import {useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context";
import Menu from "../components/menu"
import { jwtDecode} from "jwt-decode";

interface User {
  matricula: string,
  name: string, 
  email: string,
  id: number,
  iat: number,
  type: Number
}

 
const rotasCoordenador = ["/listarTurmas"];

// Rotas que são exclusivas à alunos
const rotasAluno = ["/matricula", "/turma"];

const PrivateRoute = () => {
  const { validaAcesso, isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation()

  const rota = location.pathname;
  let usuario;

  useEffect(() => {
    validaAcesso(); 
  }, [location]);

  if (loading) {
    return <div>Carregando...</div>; 
  }

  const token = sessionStorage.getItem("token");

  // Verificando se há token
  if (token){
    try {
      usuario = jwtDecode<User>(token);
    } catch (error) {
      return (
        <Navigate to="/" replace />
      );
    }
  } else {
    return (
      <Navigate to="/" replace />
    );
  }


  if (!rotasCoordenador.includes(rota) && usuario.type !== 1) {
    return isAuthenticated ? (
      <div className="flex">
        <Menu />
        <Outlet />
      </div>
    ) : (
      <Navigate to="/" replace /> 
    );
  }

  // Verificando se não é coordenador
  if (usuario.type !== 1) {
    return isAuthenticated ? (
      <Navigate to="/inicio" replace /> 
    ) : (
      <Navigate to="/" replace /> 
    );
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
