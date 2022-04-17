
import './index.css';


export const Menu = () => {

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
                            <li><a href="http://localhost:3000/cadastro-automovel">Cadastro</a></li>
                            <li><a href="#">Listar</a></li>
                        </ul>
                    <li><a>Endereço</a></li>
                        <ul>
                            <li><a href="http://localhost:3000/cadastro-endereco">Cadastrar</a></li>
                            <li><a href="#">Buscar Endereço</a></li>
                        </ul>
                    
                    <li><a>Usuario</a></li>
                        <ul>
                            <li ><a href="http://localhost:3000/cadastro-usuario">Cadastro</a></li>
                            <li><a  href="#">Listar</a></li>
                        </ul>
                    
                    <li><a href="http://localhost:3000/entrar">Sair</a></li>
                </ul>
            </form>

        </div>
    );
}