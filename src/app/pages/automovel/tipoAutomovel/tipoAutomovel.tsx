import { useForm } from "react-hook-form";
import {api, requestPost} from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";


export const CadastroEndereco = () => {

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data: any) => {
        const resposta = await requestPost("/automovel/tipo",data)
    }

    return (
        <div>
            <div>
                <Menu></Menu>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Novo tipo</span>
                    <input {...register("description")}/>
                </label>


                <button>Registrar</button>
            </form>
        </div>
    );
}