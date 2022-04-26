
import { useForm } from "react-hook-form";
import {api} from "../../shared/Api/Api";
import './csLogin.css'
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export const Login = () => {
    const {register, handleSubmit} = useForm();
    const { authenticated, login} = useContext(AuthContext);

    const onSubmit = (data: any) => {

        const aaa = login(data);
        console.log("Status123: ",aaa)
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

                <button className="entrar" >
                    Entrar
                </button>
            </form>
        </div>
    );
}