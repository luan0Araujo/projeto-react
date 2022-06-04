import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { requestPost } from "../../shared/Api/Api"
import { MensagemUsuario } from "../MensagemUsuario"

export const TipoAutomovelCriacao = (props: any) => {
    const {register, handleSubmit } = useForm();

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

    const onSubmit = async (data: any) => {
        const resposta = await requestPost("/automovel/tipo", data)

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
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control {...register("description")} type="text" placeholder="Digite a descrição do Tipo Automovel" required />
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