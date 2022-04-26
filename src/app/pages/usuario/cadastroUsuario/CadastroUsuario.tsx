import { useForm } from "react-hook-form";
import {api} from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";

export const CadastroUsuario = () => {
    
    const {register, handleSubmit} = useForm();

    const onSubmit = (data: any) => {
        api.post("/usuarios",data)
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
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

                <label >
                    <span>Email </span>
                    <input {...register("email")}/>
                </label>
                <label>
                    <span>Senha </span>
                    <input {...register("password")}/>
                </label>
                <label >
                    <span>CPF </span>
                    <input {...register("cpf")}/>
                </label>

                <button>Registrar</button>
            </form>
        </div>
    );
};