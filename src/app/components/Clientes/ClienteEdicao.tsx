import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { requestGet, requestPatch, requestPut } from "../../shared/Api/Api";
import { MensagemUsuario } from "../MensagemUsuario";

export const ClienteEdicao = (props: any) => {
    const { register, handleSubmit, setValue } = useForm();
    const [id, setId] = useState(props.id);
    const [messageVisible, setMessageVisible] = useState(false);
    const [msg, setMsg] = useState<string>('');
    const [type, setType] = useState<string>('');

    const mensagemUsuario = async (message: string, typeMessage: string) => {
        setMessageVisible(true);
        setMsg(message)
        setType(typeMessage)
        const timer = setTimeout(() => { setMessageVisible(false) }, 3000)

        return () => clearTimeout(timer)
    }

    useEffect(() => {
        const loadData = async () => {
            const result = await requestGet(`/clientes/${id}`)
            const data = result.data;
            const birthDate = format(Date.parse(data.birthDate), 'yyyy-MM-dd')

            setValue("name", data.name)
            setValue("email", data.email)
            setValue("cpf", data.cpf)
            setValue("rg", data.rg)
            setValue("telefoneCelular", data.telefoneCelular ?? 'N/A')
            setValue("birthDate", birthDate)
        }

        loadData()
    }, [props.show == true])

    const onSubmit = async (data: any) => {
        const resposta = await requestPut(`/clientes/${id}`, data)

        if (resposta.status === 200) {
            mensagemUsuario('Registro Salvo com Sucesso!', 'success')
        }
        else {
            mensagemUsuario(`Erro: ${resposta.data.error}`, 'error')
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control {...register("name")} type="text" placeholder="Digite a descrição do Tipo Automovel" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register("email")} type="text" placeholder="Digite a descrição do Tipo Automovel" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control {...register("cpf")} type="text" placeholder="Digite a descrição do Tipo Automovel" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>RG</Form.Label>
                            <Form.Control {...register("rg")} type="text" placeholder="Digite a descrição do Tipo Automovel" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Telefone Celular</Form.Label>
                            <Form.Control {...register("telefoneCelular")} type="text" placeholder="Digite a descrição do Tipo Automovel" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control {...register("birthDate")} type="date" placeholder="Digite a descrição do Tipo Automovel" required />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.onClose}>
                                Fechar
                            </Button>
                            <Button variant="success" type="submit" >
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}