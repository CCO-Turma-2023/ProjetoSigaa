import { User } from "../pages/inicio/page"
import { jwtDecode } from "jwt-decode";


export default function DecodificarToken() {

    const token = sessionStorage.getItem("token");
    let usuario: User;
  
    if (!token) {
      return null;
    }

    try {
        usuario = jwtDecode<User>(token);
    } catch (error) {
        return null;
    }

    return usuario;
}