
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './index.css';
import { ImExit } from "react-icons/im";
import { Button, Nav } from 'react-bootstrap';


export const Menu = () => {

    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            <Nav defaultActiveKey="/ordem" as="ul" className='menu'>
                <Nav.Item as="li">
                    <Nav.Link href="/ordem">Ordem Serviço</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/automovel">Automovel</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/tipo-automovel">Tipo Automovel</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/usuarios">Usuários</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/clientes">Clientes</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#" onClick={handleLogout}>LogOut</Nav.Link>
                </Nav.Item>

            </Nav>
            {/* <ul className='menu'>
                <li><a href='#'>Ordem</a>
                    <ul>
                        <li><a href="http://localhost:3000/ordem">Nova Ordem</a></li>
                        <li><a href="#">Ordens Finalizadas</a></li>
                        <li><a href="#">Ordens em Aberto</a></li>
                        <li><a href="#">Ordens Canceladas</a></li>
                    </ul>
                </li>

                <li><a href='#'>Cadastro</a>
                    <ul>
                        <li><a href="http://localhost:3000/automovel">Automovel</a></li>
                        <li><a href="http://localhost:3000/tipo-automovel">Tipo Automovel</a></li>
                        <li ><a href="http://localhost:3000/usuarios">Usuario</a></li>
                        <li ><a href="http://localhost:3000/clientes">Cliente</a></li>
                    </ul>
                </li>

                <li></li>
            </ul> */}


        </div>
    );
}