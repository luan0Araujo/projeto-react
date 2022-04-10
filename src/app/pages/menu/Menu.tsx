import { useState } from "react";
import { CadastroAutomovel } from "../automovel/cadastroAutomovel/CadastroAutomovel";
import { CadastroUsuario } from "../usuario/cadastroUsuario/CadastroUsuario";
import './index.css';


export const Menu = () => {


    const [showElement, setShowElement] = useState(false)

    const showOrHide = () => {
        if(showElement === true){
            setShowElement(false)

        }
        else{
            setShowElement(true)
        }
    }

    return (
        <div>
            <form className="menu">
                <ul id="nav">
                    <li><a>Ordem</a></li>
                        <ul>
                            <li><a href="#">Nova Ordem</a></li>
                            <li><a href="#">Ordens Finalizadas</a></li>
                            <li><a href="#">Ordens em Aberto</a></li>
                            <li><a href="#">Ordens Canceladas</a></li>
                        </ul>

                    <li><a>Automovel</a></li>
                        <ul>
                            <li><button type="button" onClick={showOrHide}>Cadastrar</button></li>
                            <li><a href="#">Listar</a></li>
                        </ul>
                    <li><a>Endereço</a>
                        <ul>
                            <li><a href="#">Cadastrar</a></li>
                            <li><a href="#">Buscar Endereço</a></li>
                        </ul>
                    </li>
                    <li><a>Usuario</a>
                        <ul>
                            <li ><button type="button" onClick={showOrHide}>Cadastrar</button></li>
                            <li><a>Listar</a></li>
                        </ul>
                    </li>
                    <li><a href="http://localhost:3000/entrar">Sair</a></li>
                </ul>
            </form>
            <div className="formulario">
                <div className="cadastro">
                    { showElement ? <CadastroUsuario ></CadastroUsuario>: null }
                </div>
                { showElement ? <CadastroAutomovel></CadastroAutomovel> : null }
            </div>
        </div>
    );
}