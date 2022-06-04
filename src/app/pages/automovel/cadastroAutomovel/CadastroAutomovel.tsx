import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { requestDelete, requestGet, requestPost, requestPut} from "../../../shared/Api/Api";
import { Menu } from "../../menu/Menu";
import { Lista } from "../../../contexts/Lista";
import './Lista.css'
import './csMessage.css'

import { Button, Form } from "react-bootstrap"
import { ListagemAutomovel } from "../listagemAutomovel/ListagemAutomovel";

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
        <>
            <div>
                <Menu></Menu>
            </div>
            <div className="aa">
                <ListagemAutomovel 
                onSelectionChanged = {onSelectionChanged} 

                />
                {/* <Lista 
                    onSelectionChanged = {onSelectionChanged} 
                    columnDef = {columnDefs}
                    endereco = '/automovel'
                    
                ></Lista> */}
            </div>
            {visible && ( <div className={type}>{msg}</div>)}
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Placa</Form.Label>
                    <Form.Control {...register("plate")} type="text" placeholder="Digite a placa" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicModelo">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control {...register("model")} type="text" placeholder="Modelo" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicMarca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control {...register("brand")} type="text" placeholder="Marca" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCor">
                    <Form.Label>Cor</Form.Label>
                    <Form.Control {...register("color")} type="text" placeholder="Cor"  required/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicAno">
                    <Form.Label>Ano</Form.Label>
                    <Form.Control {...register("year")} type="text" placeholder="Ano do Carro" required/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicRenavam">
                    <Form.Label>Renavam</Form.Label>
                    <Form.Control {...register("renavam")} type="text" placeholder="Renavam" required/>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select {...register("customerId")} disabled={inputLock} required>
                        <option>Selecione o Cliente</option>
                        {
                            listClient.map(({name}) => {return <option>{name}</option>})
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tipo de Veiculo</Form.Label>
                    <Form.Select {...register("typeId")} disabled={inputLock} required>
                        <option>Selecione o Tipo do Veículo</option>
                        {
                            listTipo.map(({description}) => {return <option>{description}</option>})
                        }
                    </Form.Select>
                </Form.Group>
                <div className="button-group">
                    {edit ? <Button type="button"  onClick={Limpar}>Limpar</Button> : true}
                    {edit ? <Button type="button" variant="warning" onClick={editaAutomovel}>Editar</Button> : false}
                    {edit ? <Button type="button" variant="danger" onClick={excluirAutomovel}>Excluir</Button>: false}

                    <Button variant="success" type="submit">
                        Salvar
                    </Button>
                </div>

            </Form>
        
        </>
    );
}