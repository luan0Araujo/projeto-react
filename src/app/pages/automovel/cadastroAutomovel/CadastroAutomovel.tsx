import { useForm } from "react-hook-form";
import {api} from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";
import { ListaAutomovel } from "../listaAutomovel/ListaAutomovel";


export const CadastroAutomovel = () => {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data: any) => {
        api.post("/automovel",data)
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
            <div>
                <ListaAutomovel></ListaAutomovel>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Placa </span>
                    <input {...register("plate")}/>
                </label>
                <label >
                    <span>Modelo </span>
                    <input {...register("model")}/>
                </label>
                <label >
                    <span>Marca </span>
                    <input {...register("brand")}/>
                </label>
                <label >
                    <span>Cor </span>
                    <input {...register("color")}/>
                </label>
                <label >
                    <span>Ano </span>
                    <input {...register("year")}/>
                </label>
                <label>
                    <span>Renavam </span>
                    <input {...register("renavam")}/>
                </label>

                <button>Registrar</button>
            </form>
        </div>
    );
}