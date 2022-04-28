
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './index.css';
import { ImExit } from "react-icons/im";


export const Menu = () => {

    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            
                <ul className='menu'>
                    <li><a href='#'>Ordem</a>
                        <ul>
                            <li><a href="#">Nova Ordem</a></li>
                            <li><a href="#">Ordens Finalizadas</a></li>
                            <li><a href="#">Ordens em Aberto</a></li>
                            <li><a href="#">Ordens Canceladas</a></li>
                        </ul>
                    </li>

                    <li><a href='#'>Cadastro</a>
                        <ul>
                            <li><a href="http://localhost:3000/cadastro-automovel">Automovel</a></li>
                            <li><a href="http://localhost:3000/cadastro-endereco">Endereço</a></li>
                            <li ><a href="http://localhost:3000/cadastro-usuario">Usuario</a></li>
                        </ul>
                    </li>

                    <li><a href='#'>Endereço</a>
                        <ul>

                        </ul>
                    </li>
                    
                    <li><a href='#'>Usuario</a>
                        <ul>
                            
                        </ul>
                    </li>
                    
                    <li><button className='logout' onClick={handleLogout}><ImExit></ImExit></button></li>
                </ul>
            

        </div>
    );
}