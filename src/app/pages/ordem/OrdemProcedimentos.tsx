import { useState } from "react";
import { useForm } from "react-hook-form";
import { requestPost } from "../../shared/Api/Api"


export const OrdemProcedimentos = (props:any) => {

    const {register, handleSubmit, setValue} = useForm();
    const [msg, setMsg] = useState();
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState()

    console.log(props)
    const mensagemUsuario = (msg: any, type: any) => {

        setMsg(msg)
        setType(type)
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false)}, 3000 )
        
        return () => clearTimeout(timer)
    }

    const onSubmit = async (data: any) => {
        console.log(props.ordemServicoId)
        data = data + props.ordemServicoId
        
        if(props.type === 'Procedimentos'){
            console.log('Procedimentos',data)
            /*
            const resposta = await requestPost("/os/procedimentos",data)

            if (resposta.status === 201){
                mensagemUsuario('Criado com Sucesso', 'success')
            }
            else {
                mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
            }*/
        }
        else{
            console.log('PEÇA',data)
            /*
            const resposta = await requestPost("/os/pecas",data)
            if (resposta.status === 201){
                mensagemUsuario('Criado com Sucesso', 'success')
            }
            else {
                mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
            }*/
            
        }

    }

   return(
    
    <div>
        {visible && ( <div className={type}>{msg}</div>)}
           <form onSubmit={handleSubmit(props.onSubmitProcedimentos)}>

            <label >
                <span>Descrição</span>
                <input {...register("description")} />
            </label>
            <label>
                <span>Valor</span>
                <input {...register("unit_value")}  />
            </label>
            <label>
                <span>Quantidade</span>
                <input {...register("amount")}  />
            </label>

            <button>Registrar</button>
        </form> 
    </div>

   )
}