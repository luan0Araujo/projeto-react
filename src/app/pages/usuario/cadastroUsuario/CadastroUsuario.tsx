import { useForm } from "react-hook-form";
import api from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";

export const CadastroUsuario = () => {
    
    const {register, handleSubmit} = useForm();

    const onSubmit = (data: any) => {
        //comunicar com a api
        console.log(data)
    }
    
    return (
        <div>
            <div>
                <Menu></Menu>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Nome </span>
                    <input {...register("name")}/>
                </label>
                <label>
                    <span>RG </span>
                    <input {...register("rg")}/>
                </label>
                <label >
                    <span>CPF </span>
                    <input {...register("cpf")}/>
                </label>
                <label >
                    <span>Nascimento </span>
                    <input {...register("birth_date")}/>
                </label>
                <label >
                    <span>Email </span>
                    <input {...register("email")}/>
                </label>
                <label>
                    <span>Senha </span>
                    <input {...register("password")}/>
                </label>

                <button>Registrar</button>
            </form>
        </div>
    );
};