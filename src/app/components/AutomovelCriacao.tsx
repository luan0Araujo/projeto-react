import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { requestGet, requestPost } from "../shared/Api/Api"
import { MensagemUsuario } from "./MensagemUsuario"

export const AutomovelCriacao = (props: any) => {
    const {register, handleSubmit, setValue} = useForm();
    const [listClient, setListClient] = useState([])
    const [listTipo, setListTipo] = useState([])

    const[messageVisible, setMessageVisible] = useState(false);
    const[msg, setMsg] = useState<string>('');
    const[type, setType] = useState<string>('');

    const mensagemUsuario = async (message: string, typeMessage: string) => {
        setMessageVisible(true);
        setMsg(message)
        setType(typeMessage)
        const timer = setTimeout(() => { setMessageVisible(false)}, 3000 )
        
        return () => clearTimeout(timer)
    }

    const clienteList = async () => {
        const resposta = await requestGet('/clientes')
        setListClient(resposta.data)   
    }

    const tipoList = async () => {
        const resposta = await requestGet('/automovel/tipo/list')
        setListTipo(resposta.data)  
    }

    useEffect(() => {
        clienteList()
        tipoList()
    }, [props.show == true])

    const onSubmit = async (data: any) => {
        const cliente:any =  listClient.filter((e:any) => e.name === data.customerId)
        const tipo:any =  listTipo.filter((e:any) => e.description === data.typeId)
        data.customerId = cliente[0].id
        data.typeId = tipo[0].id
        const resposta = await requestPost("/automovel", data)

        if (resposta.status === 201) {
            mensagemUsuario('Registro Adicionado com Sucesso!', 'success')
        }
        else {
            mensagemUsuario(`Erro: ${resposta.data.error}`, 'error')
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Automovel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Placa</Form.Label>
                        <Form.Control {...register("plate")} type="text" placeholder="Digite a placa" required />
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
                        <Form.Control {...register("color")} type="text" placeholder="Cor" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAno">
                        <Form.Label>Ano</Form.Label>
                        <Form.Control {...register("year")} type="text" placeholder="Ano do Carro" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRenavam">
                        <Form.Label>Renavam</Form.Label>
                        <Form.Control {...register("renavam")} type="text" placeholder="Renavam" required />
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select {...register("customerId")}  required>
                            <option>Selecione o Cliente</option>
                            {
                                listClient.map(({ name }) => { return <option>{name}</option> })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de Veiculo</Form.Label>
                        <Form.Select {...register("typeId")}  required>
                            <option>Selecione o Tipo do Veículo</option>
                            {
                                listTipo.map(({ description }) => { return <option>{description}</option> })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Fechar
                    </Button>
                    <Button variant="success" type="submit" >
                        Registrar
                    </Button>
                </Modal.Footer>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}