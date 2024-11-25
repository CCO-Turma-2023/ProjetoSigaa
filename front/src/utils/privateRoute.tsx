import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem("token"); // Pegue o token de forma segura
  if (!token) {
    console.warn("Token não encontrado!");
    return false;
  }

  try {
    const response = await axios.get("http://localhost:3200/users/autentica", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200; // Autenticado se status for 200
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return false;
  }
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true; // Para evitar atualizações no estado após desmontar
    const checkAuthentication = async () => {
      const result = await isAuthenticated();
      if (isMounted) setAuthenticated(result);
    };

    checkAuthentication();

    return () => {
      isMounted = false; // Limpeza ao desmontar
    };
  }, []);

  if (authenticated === null) {
    return null; // Exemplo simples de loading
  }

  return authenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace /> // Usar "replace" evita adicionar no histórico de navegação
  );
};

export default PrivateRoute;
