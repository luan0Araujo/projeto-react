import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
import { Button, Table } from "react-bootstrap";
import { ClienteCriacao } from "../../components/Clientes/ClienteCriacao";
import { ClienteEdicao } from "../../components/Clientes/ClienteEdicao";
import { MensagemUsuario } from "../../components/MensagemUsuario";
import { TipoAutomovelCriacao } from "../../components/TipoAutomovel/TipoAutomovelCriacao";
import { TipoAutomovelEdicao } from "../../components/TipoAutomovel/TipoAutomovelEdicao";
import { requestDelete, requestGet } from "../../shared/Api/Api";
import { columnDefsCliente } from "../../shared/constants/columnsDefsCliente";
import { Menu } from "../menu/Menu";

export const Clientes = () => {

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

    const endereco = "/clientes"
    useEffect(() => {
        list(endereco);
    }, [actualData])


    const list = useCallback(async (endereco) => {
        await requestGet(endereco).then(
            async (resposta) => {
                if (resposta.data[0].createdAt) {
                    const data = resposta.data.filter((e: any) => e.createdAt = format(Date.parse(e.createdAt), 'yyyy-MM-dd'))
                    setRowData(await data)
                }
                if (resposta.data[0].birthDate) {
                    const data = resposta.data.filter((e: any) => e.birthDate = format(Date.parse(e.birthDate), 'yyyy-MM-dd'))
                    setRowData(await data)
                }
                const response = await resposta.data;
                setRowData(response)
                setActualData(response)
            }
        )
    }, []);

    const excluirCliente = async (id: string) => {
        const resposta = await requestDelete(`/clientes/${id}`)
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
                                <h2>Clientes</h2>
                                    <Button variant="success" onClick={() => setShowCreation(true)}>&#xE147; Adicionar</Button>
                                </div>
                            </div>
                        </div>
                        {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                        <Table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    {
                                        columnDefsCliente.map(({ headerName }) => { return <th>{headerName}</th> })
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
                                            <td>{res["rg"]}</td>
                                            <td>{res["telefoneCelular"] ?? 'N/A'}</td>
                                            <td>{res["birthDate"]}</td>
                                            <td>{res["createdAt"]}</td>
                                            <td><Button variant="warning" onClick={() => {setShowEdition(true); setActualId(res["id"])}}>✎ Editar</Button></td>
                                            <td><Button variant="danger" onClick={() => excluirCliente(res["id"])}>&#xE15C; Excluir</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            {showEdition ? (<ClienteEdicao show={showEdition} id={actualId} onClose={() => setShowEdition(false)} />) : null}
            {showCreation ? (<ClienteCriacao show={showCreation} onClose={() => setShowCreation(false)} />) : null}

        </>

    );
}