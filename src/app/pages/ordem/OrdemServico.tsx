import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Lista } from "../../contexts/Lista";
import { requestGet, requestPost } from "../../shared/Api/Api"
import { Menu } from "../menu/Menu"
import { OrdemProcedimentos } from "./OrdemProcedimentos";


export const OrdemServico = () => {

    const {register, handleSubmit, setValue} = useForm();
    const [listAuto, setListAuto] = useState([])
    const [msg, setMsg] = useState();
    const [edit, setEdit] = useState(true)
    const [inputLock, setInputLock] = useState(false)
    const [typeOrdem, setTypeOrdem] = useState<string>()
    const [visible, setVisible] = useState(false)
    const [typeMsg, setTypeMsg] = useState()
    const [selecionado, setSelecionado] = useState([])

    const columnDefs = [
        { field: 'automovel.plate', headerName: 'Placa' },
        { field: 'descricao', headerName: 'Serviço' },
        { field: 'automovel.cliente.name', headerName: 'Cliente' },
        { field: 'valorTotal', headerName: 'Valor' },
    ];

    useEffect(() => {
        automovelList()
        
    },[])

    const automovelList = async () => {
        const resposta = await requestGet('/automovel')
        setListAuto(resposta.data)   
    }

    const mensagemUsuario = (msg: any, typeMsg: any) => {

        setMsg(msg)
        setTypeMsg(typeMsg)
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false)}, 3000 )
        
        return () => clearTimeout(timer)
    }

    const onSelectionChanged = async (selecionado:any) => {
        
        setSelecionado(selecionado[0].id)

        setValue("automovelId", selecionado[0].automovel.plate)
        setValue("descricao", selecionado[0].descricao)
        setValue("valorTotal", selecionado[0].valorTotal)

        setEdit(false)
        setInputLock(true)  
        
    }
    const onSubmit = async (data: any) => {
        
        const resposta = await requestPost("/os",data)
    
        if (resposta.status === 201){
            mensagemUsuario('Criado com Sucesso', 'success')
        }
        else {
            mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
        }
    }

    return (
        <div>
            <div>
                <Menu></Menu>
            </div>
            {visible && ( <div className={typeMsg}>{msg}</div>)}

            <div className="aa">
                <Lista 
                onSelectionChanged = {onSelectionChanged} 
                columnDef = {columnDefs}
                endereco = '/os'
                ></Lista>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Automovel </span>
                    <select {...register("automovelId")} disabled={inputLock}>
                        <option></option>
                        {
                            listAuto.map(({plate}) => {return <option>{plate}</option>})
                        }
                    </select>
                </label>

                <label >
                    <span>Serviço </span>
                    <input {...register("descricao")} disabled={inputLock} required/>
                </label>
                <label>
                    <span>Valor </span>
                    <input {...register("valorTotal")} disabled={inputLock} required/>
                </label>


                {edit ? <button>Registrar</button> : true}
                {typeOrdem ? <OrdemProcedimentos type={typeOrdem} ordemServicoId={selecionado} ></OrdemProcedimentos> : false}
                
            </form>
            
                    {inputLock ? <input type='radio' name="typeOrdem" value='Procedimentos' onChange={() => setTypeOrdem('Procedimentos')}></input> : false}
                    {inputLock ? <label htmlFor="Procedimentos">Procedimentos</label> : false}
                    {inputLock ? <input type='radio' name="typeOrdem" value='Peca' onChange={() => setTypeOrdem('peca')}></input> : false}
                    {inputLock ? <label htmlFor="Peca">Peça</label> : false}


        </div>
    )
}