import { Modal, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import './csLogin.css'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";



export const Login = () => {
    const { register, handleSubmit } = useForm();
    const { login } = useContext(AuthContext);
    const [resp, setResp] = useState();
    const [visible, setVisible] = useState(false)

    const mensagemUsuario = (msg: any) => {

        setResp(msg)
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false) }, 3000)

        return () => clearTimeout(timer)
    }

    const onSubmit = async (data: any) => {

        const resposta = await login(data);
        if (resposta) {

            mensagemUsuario(resposta)

        }

    }

    return (
        // <div className="login">
        <>

        <div className="formLogin">
          <Form onSubmit={handleSubmit(onSubmit)}>
                {visible && (<div className={'error'}>{resp}</div>)}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...register("email")} type="text" placeholder="Email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control {...register("password")} type="password" placeholder="Senha" required />
                </Form.Group>

                <Button variant="success" type="submit" className="btn-form-ngn">
                        Entrar
                    </Button>
            </Form>
        </div>
        </>
    );
}