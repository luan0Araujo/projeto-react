
import { useForm } from "react-hook-form";
import './csLogin.css'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";



export const Login = () => {
    const {register, handleSubmit} = useForm();
    const { login} = useContext(AuthContext);
    const [ resp, setResp] = useState();
    const [visible, setVisible] = useState(false)

    const mensagemUsuario = (msg: any) => {

        setResp(msg)
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false)}, 3000 )
        
        return () => clearTimeout(timer)
    }

    const onSubmit = async (data: any) => {

        const resposta = await login(data);
        if(resposta){
            
            mensagemUsuario(resposta)
           
        }
        
    }

    return (
        <div className="login">
            
            
            <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>
                {visible && ( <div className={'error'}>{resp}</div>)}
                <label className="email">
                    <span>Email </span>
                    <input {...register("email")}/>
                </label>

                <label className="senha">
                    <span>Senha </span>
                    <input type="password"  {...register("password")}/>
                </label>
                
                <button className="entrar">
                    Entrar
                </button>
                <div className="resposta">
                    
                </div>
                
            </form>
            
        </div>
    );
}