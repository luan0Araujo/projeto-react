import { useContext, useState } from "react";
import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { AuthProvicer, AuthContext } from "../contexts/auth";
import { Dashboard, Login, CadastroUsuario, Menu, CadastroAutomovel, CadastroEndereco, Lista, CadastroCliente, OrdemServico } from '../pages';
import { ListagemAutomovel } from "../pages/automovel/listagemAutomovel/ListagemAutomovel";
export const Routes = () => {

    const Private = ({children}:any) => {
        const { authenticated, loading} = useContext(AuthContext)
        
        if (loading) {
            return <div className="loading">Carregando...</div>
        }

        if(!authenticated) {
            return <Navigate to="/entrar"/>
        }
        return children;
    }
    return (
        <BrowserRouter>
            <AuthProvicer>
                <Switch>

                    <Route path="/pagina-inicial" element={<Dashboard />} />
                    <Route path="/entrar" element={<Login />} />
                    <Route path="/cadastro-usuario" element={ <Private> <CadastroUsuario /> </Private>} />
                    <Route path="/cadastro-automovel" element={ <Private> <CadastroAutomovel /> </Private> } />
                    <Route path="/automovel" element={ <Private> <ListagemAutomovel /> </Private> } />
                    <Route path="/cadastro-cliente" element={ <Private> <CadastroCliente /> </Private> } />
                    <Route path="/tipo-automovel" element={ <Private> <CadastroEndereco /> </Private> } />
                    <Route path="/ordem" element={ <Private> <OrdemServico /> </Private> } />
                    <Route path="/menu" element={ <Private><Menu /></Private> } />
                    <Route path="*" element={<Navigate to="/entrar" />} />
                </Switch>
            </AuthProvicer>
        </BrowserRouter>
    );
}