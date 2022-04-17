import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";

import { Dashboard, Login, CadastroUsuario, Menu, CadastroAutomovel, CadastroEndereco} from '../pages'; 

export const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/pagina-inicial" element = {<Dashboard />} />
                <Route path="/entrar" element = {<Login />} />
                <Route path="/cadastro-usuario" element = {<CadastroUsuario />} />
                <Route path="/cadastro-automovel" element = {<CadastroAutomovel />} />
                <Route path="/cadastro-endereco" element = {<CadastroEndereco />} />
                <Route path="/menu" element = {<Menu />} />
                <Route path= "*" element = {<Navigate to="/pagina-inicial" />}/>
            </Switch>
        </BrowserRouter>
    );
}