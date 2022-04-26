import { useContext, useState } from "react";
import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { AuthProvicer, AuthContext } from "../contexts/auth";
import { Dashboard, Login, CadastroUsuario, Menu, CadastroAutomovel, CadastroEndereco, ListaAutomovel } from '../pages';

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
                    <Route path="/lista-automovel" element={ <Private> <ListaAutomovel /> </Private> } />
                    <Route path="/cadastro-endereco" element={ <Private> <CadastroEndereco /> </Private> } />
                    <Route path="/menu" element={ <Private><Menu /></Private> } />
                    <Route path="*" element={<Navigate to="/entrar" />} />
                </Switch>
            </AuthProvicer>
        </BrowserRouter>
    );
}