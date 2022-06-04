import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { requestGet, requestPatch } from "../../shared/Api/Api";
import { MensagemUsuario } from "../MensagemUsuario";

export const TipoAutomovelEdicao = (props:any) => {
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
            const result = await requestGet(`/automovel/tipo/list`)
            const data = result.data;
            const actualTipo = data.filter((element: any) => element.id === id)
            setValue("description", actualTipo[0].description)
        }

        loadData()
    }, [props.show == true])

    const onSubmit = async (data: any) => {
        const resposta = await requestPatch(`/automovel/tipo/${id}`, data)

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
                    <Modal.Title>Automovel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control {...register("description")} type="text" placeholder="Digite o Tipo Automovel" required />
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