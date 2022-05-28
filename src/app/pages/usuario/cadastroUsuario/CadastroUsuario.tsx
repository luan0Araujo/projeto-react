import { useState } from "react";
import { useForm } from "react-hook-form";
import { ListaAutomovel } from "../../../contexts/Lista";
import { requestDelete, requestPost, requestPut} from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";

export const CadastroUsuario = () => {
    
    const {register, handleSubmit, setValue} = useForm();
    const [selecionado, setSelecionado] = useState([])
    const [edit, setEdit] = useState(false)
    const [inputLock, setInputLock] = useState(false)

    const columnDefs = [
        { field: 'name', headerName: 'Nome' },
        { field: 'email', headerName: 'Email' },
        { field: 'cpf', headerName: 'CPF' },
        { field: 'telefoneCelular', headerName: 'Telefone' },
    ];

    const Limpar = () => {
        setEdit(false)
        setInputLock(false)
        setValue("name", '')
        setValue("email", '')
        setValue("password", '')
        setValue("cpf", '')
        setValue("telefoneCelular", '')
    
    }

    const excluirAutomovel = () => {
        const resposta = requestDelete(`/usuarios/${selecionado}`)
    }

    const editaAutomovel = () => {
        setInputLock(false)
    }

    const onSelectionChanged = async (selecionado:any) => {

        setSelecionado(selecionado[0].id)

        setValue("name", selecionado[0].name)
        setValue("email", selecionado[0].email)
        setValue("cpf", selecionado[0].cpf)
        setValue("telefoneCelular", selecionado[0].telefoneCelular)

        setEdit(true)
        setInputLock(true)  
        
    }

    const onSubmit = async (data: any) => {
        const resposta = await requestPost("/",data)

        if ( edit === true ){
            const resposta = await requestPut(`/usuarios/${selecionado}`,data)
            console.log(resposta)
        }
        else{
            const resposta = await requestPost("/usuarios",data)
            console.log('Error  ', resposta)
        }
    
    }
    
    return (
        <div>
            <div>
                <Menu></Menu>
            </div>
            <div className="aa">
                <ListaAutomovel 
                onSelectionChanged = {onSelectionChanged} 
                columnDef = {columnDefs}
                endereco = '/usuarios'
                ></ListaAutomovel>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Nome </span>
                    <input {...register("name")} disabled={inputLock}/>
                </label>

                <label >
                    <span>Email </span>
                    <input {...register("email")} disabled={inputLock}/>
                </label>
                <label>
                    <span>Senha </span>
                    <input {...register("password")} disabled={inputLock}/>
                </label>
                <label >
                    <span>CPF </span>
                    <input {...register("cpf")} disabled={inputLock}/>
                </label>
                <label >
                    <span>Telefone </span>
                    <input {...register("telefoneCelular")} disabled={inputLock}/>
                </label>

                {edit ? <button onClick={Limpar}>Limpar</button> : true}
                {edit ? <button onClick={editaAutomovel}>Editar</button> : false}
                {edit ? <button onClick={excluirAutomovel}>Excluir</button> : false}
                <button>Registrar</button>
            </form>
        </div>
    );
};