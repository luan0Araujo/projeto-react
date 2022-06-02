import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { requestDelete, requestGet, requestPost, requestPut} from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";
import { Lista } from "../../../contexts/Lista";
import './Lista.css'
import './csMessage.css'



export const CadastroAutomovel = () => {

    const {register, handleSubmit, setValue} = useForm();
    const [listClient, setListClient] = useState([])
    const [listTipo, setListTipo] = useState([])
    const [selecionado, setSelecionado] = useState([])
    const [edit, setEdit] = useState(false)
    const [inputLock, setInputLock] = useState(false)
    const [msg, setMsg] = useState();
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState()
   
    const columnDefs = [
        { field: 'plate', headerName: 'Placa' },
        { field: 'model', headerName: 'Modelo' },
        { field: 'brand', headerName: 'Marca' },
        { field: 'color', headerName: 'Cor' },
        { field: 'year', headerName: 'Ano' },
        { field: 'renavam', headerName: 'Renavam' },
        { field: 'cliente.name', headerName: 'Cliente' },
      ];

    useEffect(() => {
        clienteList()
        tipoList()
        
    },[])
    
    const mensagemUsuario = (msg: any, type: any) => {

        setMsg(msg)
        setType(type)
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false)}, 3000 )
        
        return () => clearTimeout(timer)
    }

    const onSelectionChanged = async (selecionado:any) => {
        setSelecionado(selecionado[0].id)
        setValue("plate", selecionado[0].plate)
        setValue("model", selecionado[0].model)
        setValue("brand", selecionado[0].brand)
        setValue("color", selecionado[0].color)
        setValue("year", selecionado[0].year)
        setValue("renavam", selecionado[0].renavam)
        setValue("customerId", selecionado[0].cliente.name)
        setValue("typeId", selecionado[0].tipoAutomovel.description)

        setEdit(true)
        setInputLock(true)  
    }
    
    const tipoList = async () => {
        const resposta = await requestGet('/automovel/tipo/list')
        setListTipo(resposta.data)  
    }

    const clienteList = async () => {
        const resposta = await requestGet('/clientes')
        setListClient(resposta.data)   
    }

    const editaAutomovel = () => {
        setInputLock(false)

    }

    const excluirAutomovel = async () => {
        const resposta = await requestDelete(`/automovel/${selecionado}`)
        if (resposta.status === 200){
            mensagemUsuario('Excluido com Sucesso', 'success')
        }
        else {
            mensagemUsuario('Erro', 'error')
        }
    }

    const Limpar = () => {
        setEdit(false)
        setInputLock(false)
        setValue("plate", '')
        setValue("model", '')
        setValue("brand",'')
        setValue("color", '')
        setValue("year", '')
        setValue("renavam", '')
        setValue("customerId", '')
        setValue("typeId", '')

    }

    const onSubmit = async (data: any) => {
       
        const cliente:any =  listClient.filter((e:any) => e.name === data.customerId)
        const tipo:any =  listTipo.filter((e:any) => e.description === data.typeId)
        data.customerId = cliente[0].id
        data.typeId = tipo[0].id
        if ( edit === true ){

            const resposta = await requestPut(`/automovel/${selecionado}`,data)

            if (resposta.status === 200){
                mensagemUsuario('Editado com Sucesso', 'success')
            }
            else {
                mensagemUsuario('Erro', 'error')
            }
              
        }
        else{

            const resposta = await requestPost("/automovel",data)
    
            if (resposta.status === 201){
                mensagemUsuario('Criado com Sucesso', 'success')
            }
            else {
                mensagemUsuario('Erro', 'error')
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
                    endereco = '/automovel'
                    
                ></Lista>
            </div>
            {visible && ( <div className={type}>{msg}</div>)}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Placa </span>
                    <input {...register("plate")}  disabled={inputLock} required/>
                </label>
                <label >
                    <span>Modelo </span>
                    <input {...register("model")}  disabled={inputLock} required/>
                </label>
                <label >
                    <span>Marca </span>
                    <input {...register("brand")}  disabled={inputLock} required/>
                </label>
                <label >
                    <span>Cor </span>
                    <input {...register("color")}  disabled={inputLock} required/>
                </label>
                <label >
                    <span>Ano </span>
                    <input {...register("year")}  disabled={inputLock} required/>
                </label>
                <label>
                    <span>Renavam</span>
                    <input {...register("renavam")}  disabled={inputLock} required/>
                </label>
                <label>

                    <span>Cliente</span>
                    <select {...register("customerId")} disabled={inputLock}>
                        <option></option>
                        {
                            listClient.map(({name}) => {return <option>{name}</option>})
                        }
                    </select>

                </label>
                <label>

                    <span>Tipo de Veiculo</span>
                    <select {...register("typeId")} disabled={inputLock}>
                    <option></option>
                        {
                            listTipo.map(({description}) => {return <option>{description}</option>})
                        }
                    </select>

                </label>
                {edit ? <button type="button" onClick={Limpar}>Limpar</button> : true}
                {edit ? <button type="button" onClick={editaAutomovel}>Editar</button> : false}
                {edit ? <button type="reset" onClick={excluirAutomovel}>Excluir</button> : false}

                <button type="submit">Registrar</button>
            </form>


        </div>
    );
}