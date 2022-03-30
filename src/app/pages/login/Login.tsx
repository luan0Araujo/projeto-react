import { useCallback, useState } from "react";
import './cs.css'

export const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const handleEntrar = useCallback(() => {
        if(email.length && password.length === 0 ) return;
        console.log(email)
        console.log(password)
    }, [email, password])
    
    return (
        <div>
            <form>
                <label className="email">
                    <span>Email </span>
                    <input value={email} onChange={e => setEmail(e.target.value)}/>
                </label>

                <label className="senha">
                    <span>Senha </span>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>

                <button className="entrar" type="button" onClick={handleEntrar}>
                    Entrar
                </button>
                <button className="registrar" type="button">
                    Registrar
                </button>
            </form>
        </div>
    );
}