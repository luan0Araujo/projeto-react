import { useState } from "react";
import { useForm } from "react-hook-form";
import { requestPost } from "../../shared/Api/Api"
import { Modal, Button, Form } from "react-bootstrap"
import { MensagemUsuario } from "../../components/MensagemUsuario";


export const OrdemProcedimentos = (props: any) => {

    const { register, handleSubmit, setValue } = useForm();


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
        
        data = Object.assign({ordemServicoId: props.id}, data)

        if (data.type === 'Procedimentos') {
            delete data.type
            console.log('Procedimentos', data)
            
            const resposta = await requestPost("/os/procedimentos",data)

            if (resposta.status === 201) {
                mensagemUsuario('Registro Adicionado com Sucesso!', 'success')
            }
            else {
                mensagemUsuario(`Erro: ${resposta.data.error}`, 'error')
            }
        }
        else {
            
            delete data.type
            console.log('PEÇA', data)
            const resposta = await requestPost("/os/pecas",data)
            if (resposta.status === 201){
                mensagemUsuario('Registro Adicionado com Sucesso!', 'success')
            }
            else {
                mensagemUsuario(`Erro ${resposta.data.error}`, 'error')
            }

        }

    }

    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar nova Ordem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                    <Form onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group>
                            <Form.Label>Tipo de Ordem</Form.Label>
                            <Form.Select  {...register("type")} required>
                                <option>Selecione o Tipo de Ordem</option>
                                
                                <option>Peca</option>
                                <option>Procedimentos</option>
                                
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control {...register("description")} type="text" placeholder="Descrição" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control {...register("unit_value")} type="text" placeholder="Valor" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control {...register("amount")} type="text" placeholder="Quantidade" required />
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