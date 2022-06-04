import { useForm } from "react-hook-form";

import { Menu } from "../../menu/Menu";

import "react-datepicker/dist/react-datepicker.css";
import { requestDelete, requestPost, requestPut } from "../../../shared/Api/Api";
import { Lista } from "../../../contexts/Lista";
import { useState } from "react";
import { format } from 'date-fns'




export const CadastroCliente = () => {
    
    const {register, handleSubmit, setValue} = useForm();
    const [selecionado, setSelecionado] = useState([])
    const [edit, setEdit] = useState(false)
    const [inputLock, setInputLock] = useState(false)
    const [msg, setMsg] = useState();
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState()

    const columnDefs = [
        { field: 'name', headerName: 'Nome' },
        { field: 'cpf', headerName: 'CPF' },
        { field: 'rg', headerName: 'RG' },
        { field: 'birthDate', headerName: 'Nascimento' },
        { field: 'email', headerName: 'Email' },
    ];


    const mensagemUsuario = (msg: any, type: any) => {

        setMsg(msg)
        setType(type)
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false)}, 3000 )
        
        return () => clearTimeout(timer)
    }
    
    const onSelectionChanged = async (selecionado:any) => {

        setSelecionado(selecionado[0].id)

        setValue("name", selecionado[0].name)
        setValue("cpf", selecionado[0].cpf)
        setValue("rg", selecionado[0].rg)
        setValue("birthDate", format(new Date(selecionado[0].birthDate), 'yyyy-MM-dd'))
        setValue("email", selecionado[0].email)

        setEdit(true)
        setInputLock(true)  
        
    }

    const editaAutomovel = () => {
        setInputLock(false)

    }

    const excluirAutomovel = async () => {
        const resposta = await requestDelete(`/clientes/${selecionado}`)

        if (resposta.status === 200){
            mensagemUsuario('Excluido com Sucesso', 'success')
            Limpar()
        }
        else {
            mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
        }
    }

    const Limpar = () => {
        setEdit(false)
        setInputLock(false)
        setValue("name", '')
        setValue("cpf", '')
        setValue("rg",'')
        setValue("birthDate", '')
        setValue("email", '')

    }

    const onSubmit = async (data: any) => {
        
        data.birthDate = new Date(data.birthDate).toISOString()

        if ( edit === true ){
            const resposta = await requestPut(`/clientes/${selecionado}`,data)
            
            if (resposta.status === 200){
                mensagemUsuario('Editado com Sucesso', 'success')
            }
            else {
                mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
            }
        }
        else{
            const resposta = await requestPost("/clientes",data)
            
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
                endereco = '/clientes'
                ></Lista>
            </div>

            {visible && ( <div className={type}>{msg}</div>)}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Nome</span>
                    <input {...register("name")} disabled={inputLock} required/>
                </label>

                <label >
                    <span>CPF</span>
                    <input {...register("cpf")} disabled={inputLock} required/>
                </label>
                <label>
                    <span>RG</span>
                    <input {...register("rg")} disabled={inputLock} required/>
                </label>
                <label >
                    <span>Nascimento</span>
                    <input type="date" {...register("birthDate", { valueAsDate: true})} disabled={inputLock} required/>
                   
                </label>
                <label >
                    <span>Email</span>
                    <input {...register("email")} disabled={inputLock} required/>
                </label>
                <div>
                    {edit ? <button type="button" onClick={Limpar}>Limpar</button> : false}
                    {edit ? <button type="button" onClick={editaAutomovel}>Editar</button> : false}
                    {edit ? <button type='reset' onClick={excluirAutomovel}>Excluir</button> : false}
                </div>

                <button type="submit">Registrar</button>
            </form>

        </div>
    );
};