import {useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context";
import Menu from "../components/menu"

const PrivateRoute = () => {
  const { validaAcesso, isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation()

  useEffect(() => {
    validaAcesso(); 
  }, [location]);

  if (loading) {
    return <div>Carregando...</div>; 
  }

  return isAuthenticated ? (
    <div className="flex">
      <Menu />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" replace /> 
  );
};

export default PrivateRoute;
