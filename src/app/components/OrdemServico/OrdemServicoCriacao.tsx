import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { requestGet, requestPost } from "../../shared/Api/Api"
import { MensagemUsuario } from "../MensagemUsuario"

export const OrdemServicoCriacao = (props: any) => {
    const { register, handleSubmit } = useForm();

    const [messageVisible, setMessageVisible] = useState(false);
    const [msg, setMsg] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [listStatus, setlistStatus] = useState([])
    const [listAutomovel, setlistAutomovel] = useState([])

    const mensagemUsuario = async (message: string, typeMessage: string) => {
        setMessageVisible(true);
        setMsg(message)
        setType(typeMessage)
        const timer = setTimeout(() => { setMessageVisible(false) }, 3000)

        return () => clearTimeout(timer)
    }

    const statusList = async () => {
        const resposta = await requestGet('/os/status')
        setlistStatus(resposta.data)
    }
    const automovelList = async () => {
        const resposta = await requestGet('/automovel')
        setlistAutomovel(resposta.data)
    }

    const onSubmit = async (data: any) => {
        const statusId = listStatus.filter((e: any) => e.description == data.statusId)
        const automovelId = listAutomovel.filter((e: any) => e.plate == data.automovelId)
        data.statusId = statusId[0]["id"]
        data.automovelId = automovelId[0]["id"]

        const resposta = await requestPost("/os", data)

        if (resposta.status === 201) {
            mensagemUsuario('Registro Adicionado com Sucesso!', 'success')
        }
        else {
            mensagemUsuario(`Erro: ${resposta.data.error}`, 'error')
        }
    }

    useEffect(() => {
        statusList()
        automovelList()
    }, [])

    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar nova Ordem Serviço</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select {...register("statusId")} required>
                                <option>Selecione o Status</option>
                                {
                                    listStatus.map(({ description }) => { return <option>{description}</option> })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Automovel</Form.Label>
                            <Form.Select {...register("automovelId")} required>
                                <option>Selecione o Automovel</option>
                                {
                                    listAutomovel.map(({ plate }) => { return <option>{plate}</option> })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control {...register("descricao")} type="text" placeholder="Descrição" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ValorTotal</Form.Label>
                            <Form.Control {...register("valorTotal")} type="text" placeholder="Valor Total" required />
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