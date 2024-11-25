import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../autentica"

export default function PrivateRoute({ children }: { children: React.ReactNode }){
    const autenticado = useAuth()

    if (autenticado === false) {
      return <Navigate to="/" replace />; // Redireciona para o login
    }

    return <>{children}</>
}