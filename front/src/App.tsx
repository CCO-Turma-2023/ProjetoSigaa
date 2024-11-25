import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/login/login.tsx";
import Sobre from "./pages/sobre/page.tsx";
import Inicio from "./pages/inicio/page.tsx";
import Menu from "./components/menu/index.tsx";
import Turma from "./pages/disciplinas/page.tsx";
import Cadastro from "./pages/cadastro/index.tsx";
import Header from "./components/headerInicio/index.tsx";
import Senha from "./pages/esqueceSenha/page.tsx";
import PrivateRoute from "./components/rotaPrivada"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/esqueceu" element={<Senha />} />
        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <div className="flex">
                <Menu />
                <Inicio />
              </div> 
            </PrivateRoute>
            
          }
        />
        <Route
          path="/turma"
          element={
            <PrivateRoute>
              <div className="flex">
                <Menu />
                <Turma />
              </div>
            </PrivateRoute>
            
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
