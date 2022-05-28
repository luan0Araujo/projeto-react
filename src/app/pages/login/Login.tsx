
import { useForm } from "react-hook-form";
import './csLogin.css'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Message } from "../../contexts/Message";


export const Login = () => {
    const {register, handleSubmit} = useForm();
    const { login} = useContext(AuthContext);
    const [ resp, setResp] = useState();
    const onSubmit = async (data: any) => {

        const resposta = await login(data);
        if(resposta){
            
            setResp(resposta)
           
        }
        
    }

    
    return (
        <div className="login">
            
            
            <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>
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
                    <Message msg={resp} type='error'/>
                </div>
                
            </form>
            
        </div>
    );
}