import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lista } from "../../../contexts/Lista";
import { requestDelete, requestPost, requestPut} from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";

export const CadastroUsuario = () => {
    
    const {register, handleSubmit, setValue} = useForm();
    const [selecionado, setSelecionado] = useState([])
    const [edit, setEdit] = useState(false)
    const [inputLock, setInputLock] = useState(false)
    const [msg, setMsg] = useState();
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState()

    const columnDefs = [
        { field: 'name', headerName: 'Nome' },
        { field: 'email', headerName: 'Email' },
        { field: 'cpf', headerName: 'CPF' },
        { field: 'telefoneCelular', headerName: 'Telefone' },
    ];

    const mensagemUsuario = (msg: any, type: any) => {

        setMsg(msg)
        setType(type)
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false)}, 3000 )
        
        return () => clearTimeout(timer)
    }

    const Limpar = () => {
        setEdit(false)
        setInputLock(false)
        setValue("name", '')
        setValue("email", '')
        setValue("password", '')
        setValue("cpf", '')
        setValue("telefoneCelular", '')
    
    }

    const excluirAutomovel = async () => {
        const resposta = await requestDelete(`/usuarios/${selecionado}`)

        if (resposta.status === 200){
            mensagemUsuario('Excluido com Sucesso', 'success')
            Limpar()
        }
        else {
            mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
        }
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
            if (resposta.status === 200){
                mensagemUsuario('Editado com Sucesso', 'success')
            }
            else {
                mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
            }
        }
        else{
            const resposta = await requestPost("/usuarios",data)
            if (resposta.status === 201){
                mensagemUsuario('Criado com Sucesso', 'success')
            }
            else {
                mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
            }
        }
    
    }
    
    return (
        <div>
            <div>
                <Menu></Menu>
            </div>
            <div className="aa">
                <Lista 
                onSelectionChanged = {onSelectionChanged} 
                columnDef = {columnDefs}
                endereco = '/usuarios'
                ></Lista>
            </div>
            
            {visible && ( <div className={type}>{msg}</div>)}

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Nome </span>
                    <input {...register("name")} disabled={inputLock} required/>
                </label>

                <label >
                    <span>Email </span>
                    <input {...register("email")} disabled={inputLock} required/>
                </label>
                <label>
                    <span>Senha </span>
                    <input {...register("password")} disabled={inputLock} required/>
                </label>
                <label >
                    <span>CPF </span>
                    <input {...register("cpf")} disabled={inputLock} required/>
                </label>
                <label >
                    <span>Telefone </span>
                    <input {...register("telefoneCelular")} disabled={inputLock} required/>
                </label>

                {edit ? <button type="button" onClick={Limpar}>Limpar</button> : true}
                {edit ? <button type="button" onClick={editaAutomovel}>Editar</button> : false}
                {edit ? <button type="reset" onClick={excluirAutomovel}>Excluir</button> : false}
                <button>Registrar</button>
            </form>
        </div>
    );
};