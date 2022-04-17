import { useForm } from "react-hook-form";
import api from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";


export const CadastroEndereco = () => {

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
                    <span>CEP</span>
                    <input {...register("cep")}/>
                </label>
                <label >
                    <span>Rua </span>
                    <input {...register("street")}/>
                </label>
                <label >
                    <span>Numero </span>
                    <input {...register("number")}/>
                </label>
                <label >
                    <span>Complemento </span>
                    <input {...register("supplement")}/>
                </label>
                <label >
                    <span>Bairro </span>
                    <input {...register("district")}/>
                </label>
                <label>
                    <span>Cidade </span>
                    <input {...register("town")}/>
                </label>
                <label>
                    <span>Estado </span>
                    <input {...register("uf")}/>
                </label>

                <button>Registrar</button>
            </form>
        </div>
    );
}