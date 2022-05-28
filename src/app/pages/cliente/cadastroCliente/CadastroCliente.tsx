import { useForm } from "react-hook-form";

import { Menu } from "../../menu/Menu";

import "react-datepicker/dist/react-datepicker.css";
import { requestDelete, requestPost, requestPut } from "../../../shared/Api/Api";
import { ListaAutomovel } from "../../../contexts/Lista";
import { useState } from "react";
import { format } from 'date-fns'




export const CadastroCliente = () => {
    
    const {register, handleSubmit, setValue} = useForm();
    const [selecionado, setSelecionado] = useState([])
    const [edit, setEdit] = useState(false)
    const [inputLock, setInputLock] = useState(false)

    const columnDefs = [
        { field: 'name', headerName: 'Nome' },
        { field: 'cpf', headerName: 'CPF' },
        { field: 'rg', headerName: 'RG' },
        { field: 'birthDate', headerName: 'Nascimento' },
        { field: 'email', headerName: 'Email' },
    ];

    
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

    const excluirAutomovel = () => {
        const resposta = requestDelete(`/clientes/${selecionado}`)
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
        console.log(data)
        if ( edit === true ){
            const resposta = await requestPut(`/clientes/${selecionado}`,data)
            console.log(resposta)
        }
        else{
            const resposta = await requestPost("/clientes",data)
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
                endereco = '/clientes'
                ></ListaAutomovel>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Nome</span>
                    <input {...register("name")} disabled={inputLock}/>
                </label>

                <label >
                    <span>CPF</span>
                    <input {...register("cpf")} maxLength={11} disabled={inputLock} />
                </label>
                <label>
                    <span>RG</span>
                    <input {...register("rg")} disabled={inputLock}/>
                </label>
                <label >
                    <span>Nascimento</span>
                    <input type="date" {...register("birthDate", { valueAsDate: true})} disabled={inputLock}/>
                   
                </label>
                <label >
                    <span>Email</span>
                    <input {...register("email")} disabled={inputLock}/>
                </label>

                {edit ? <button onClick={Limpar}>Limpar</button> : true}
                {edit ? <button onClick={editaAutomovel}>Editar</button> : false}
                {edit ? <button onClick={excluirAutomovel}>Excluir</button> : false}
                <button type="submit">Registrar</button>
            </form>

        </div>
    );
};