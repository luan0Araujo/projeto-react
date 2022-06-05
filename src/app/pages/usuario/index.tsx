import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
import { Button, Table } from "react-bootstrap";
import { MensagemUsuario } from "../../components/MensagemUsuario";
import { TipoAutomovelCriacao } from "../../components/TipoAutomovel/TipoAutomovelCriacao";
import { TipoAutomovelEdicao } from "../../components/TipoAutomovel/TipoAutomovelEdicao";
import { UsuarioCriacao } from "../../components/Usuarios/UsuarioCriacao";
import { requestGet, requestDelete } from "../../shared/Api/Api";
import { columnDefsUsuario } from "../../shared/constants/columnsDefsUsuario";
import { Menu } from "../menu/Menu";


export const Usuarios = () => {

    const [rowData, setRowData] = useState([]);

    const [actualData, setActualData] = useState([{}])
    const [actualId, setActualId] = useState('')
    const [showEdition, setShowEdition] = useState(false);
    const [showCreation, setShowCreation] = useState(false);

    const [messageVisible, setMessageVisible] = useState(false);
    const [msg, setMsg] = useState<string>('');
    const [type, setType] = useState<string>('');

    const mensagemUsuario = async (message: string, typeMessage: string) => {
        setMessageVisible(true);
        setMsg(message)
        setType(typeMessage)
        const timer = setTimeout(() => { setMessageVisible(false) }, 4000)

        return () => clearTimeout(timer)
    }

    const endereco = "/usuarios"

    useEffect(() => {

        list(endereco);

    }, [actualData])


    const list = useCallback(async (endereco) => {
        const resposta = await requestGet(endereco)
        if (resposta.data[0].created_at) {
            const data = resposta.data.filter((e: any) => e.created_at = format(Date.parse(e.created_at), 'yyyy-MM-dd'))
            setRowData(await data)
        }
        const res = await resposta.data
        setRowData(res)
        setActualData(res)
        

    }, []);

    const excluirAutomovel = async (id: string) => {
        const resposta = await requestDelete(`/usuarios/${id}`)
        if (resposta.status === 200) {
            mensagemUsuario('Excluido com Sucesso', 'success')
            const filtered = actualData.filter((e:any) => e.id === id)
            setActualData(filtered)
        }
        else {
            mensagemUsuario(`Erro: ${resposta.data.error}`, 'error')
        }
    }

    return (
        <>
            <div>
                <Menu />
            </div>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="button-add">
                                <h2>Usuarios</h2>
                                    <Button variant="success" onClick={() => setShowCreation(true)}>&#xE147; Adicionar</Button>
                                </div>
                            </div>
                        </div>
                        {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                        <Table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    {
                                        columnDefsUsuario.map(({ headerName }) => { return <th>{headerName}</th> })
                                    }
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rowData.map((res: any) => {
                                        return <tr>
                                            <td>{res["name"]}</td>
                                            <td>{res["email"]}</td>
                                            <td>{res["cpf"]}</td>
                                            <td>{res["isAdmin"] ? 'SIM' : 'NÃO'}</td>
                                            <td><Button variant="warning" onClick={() => {setShowEdition(true); setActualId(res["id"])}}>✎ Editar</Button></td>
                                            <td><Button variant="danger" onClick={() => excluirAutomovel(res["id"])}>&#xE15C; Excluir</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            {showEdition ? (<TipoAutomovelEdicao show={showEdition} id={actualId} onClose={() => setShowEdition(false)} />) : null}
            {showCreation ? (<UsuarioCriacao show={showCreation} onClose={() => setShowCreation(false)} />) : null}

        </>

    );
}