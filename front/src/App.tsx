import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/login/login";
import Sobre from "./pages/sobre/page";
import Inicio from "./pages/inicio/page";
import Turma from "./pages/disciplinas/page";
import Cadastro from "./pages/cadastro/index";
import Senha from "./pages/esqueceSenha/page";
import Matricula from "./pages/matricula/page";
import NotFound from "./pages/notfound/pages";

import PrivateRoute from "./utils/privateRoute";
import CriarTurma from "./pages/listarTurmas/page";
import "react-toastify/dist/ReactToastify.css";
import ResetarSenha from "./pages/resetarSenha/page";

function App() {
  return (
    <Router>
        <div className="h-full w-full bg-backgroundLinear">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/esqueceu" element={<Senha />} />
            <Route path="/resetar-senha" element={<ResetarSenha />} />{" "}
            {/* Nova rota */}
            <Route element={<PrivateRoute />}>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/turma" element={<Turma />} />
              <Route path="/matricula" element={<Matricula />} />
              <Route path="/listarTurmas" element={<CriarTurma />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
