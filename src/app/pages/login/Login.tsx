
import { useForm } from "react-hook-form";
import './csLogin.css'


export const Login = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
    }
    
    return (
        <div>
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