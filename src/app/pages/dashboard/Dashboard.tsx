
import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";


export const Dashboard = () => {

    const [msg, setMsg] = useState();
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState()

    const mensagemUsuario = (msg: any, type: any) => {
        if(!msg) {
            return setVisible(false)
            
        }
        setMsg(msg)
        setType(type)
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false)}, 3000 )
        
        return () => clearTimeout(timer)
    }

    return (
        <div>
            
            <form>
                {visible && ( <div className={type}>{msg}</div>)}
                <button type="button" onClick={() => mensagemUsuario('sucesso', 'success')}>sucesso</button>
                <button type="button" onClick={() => mensagemUsuario('Erro', 'error')}>Errro</button>
            </form>
        </div>
    );
}