import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { requestGet, requestPatch, requestPut } from "../../shared/Api/Api";
import { MensagemUsuario } from "../MensagemUsuario";

export const UsuarioEdicao = (props:any) => {
    const {register, handleSubmit, setValue} = useForm();
    const [id, setId] = useState(props.id);
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

    useEffect(() => {
        const loadData = async () => {
            const result = await requestGet(`/usuarios/${id}`)
            const data = result.data;
            setValue("name", data.name)
            setValue("email", data.email)
            setValue("cpf", data.cpf)
            setValue("isAdmin", data.isAdmin)
        }

        loadData()
    }, [props.show == true])

    const onSubmit = async (data: any) => {
        if (data.isAdmin == "true") data.isAdmin = true
        const resposta = await requestPut(`/usuarios/${id}`, data)

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
                    <Modal.Title>Editar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control {...register("name")} type="text" placeholder="Nome" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control {...register("email")} type="email" placeholder="Email" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cpf</Form.Label>
                        <Form.Control {...register("cpf")} type="text" placeholder="CPF (sem pontuações)" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Admin</Form.Label>
                        <Form.Control {...register("isAdmin")} type="boolean" placeholder="true or false" required />
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