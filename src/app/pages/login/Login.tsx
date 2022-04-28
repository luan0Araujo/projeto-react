
import { useForm } from "react-hook-form";
import './csLogin.css'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export const Login = () => {
    const {register, handleSubmit} = useForm();
    const { authenticated, login} = useContext(AuthContext);
    const [erro, setErro] = useState('')

    const onSubmit = async (data: any) => {

        const resposta = await login(data);
        if(resposta){
            console.log("Status123: ",resposta)
            
            setErro(resposta)
           
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
                <div>{erro !== '' && <p>{erro}</p> }</div>
                <button className="entrar" >
                    Entrar
                </button>
            </form>
            
        </div>
    );
}