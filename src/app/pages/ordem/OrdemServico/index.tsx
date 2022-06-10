import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
import { Button, Table } from "react-bootstrap";
import { ClienteCriacao } from "../../../components/Clientes/ClienteCriacao";
import { ClienteEdicao } from "../../../components/Clientes/ClienteEdicao";
import { MensagemUsuario } from "../../../components/MensagemUsuario";
import { OrdemServicoCriacao } from "../../../components/OrdemServico/OrdemServicoCriacao";
import { TipoAutomovelCriacao } from "../../../components/TipoAutomovel/TipoAutomovelCriacao";
import { TipoAutomovelEdicao } from "../../../components/TipoAutomovel/TipoAutomovelEdicao";
import { requestDelete, requestGet } from "../../../shared/Api/Api";
import { columnDefsCliente } from "../../../shared/constants/columnsDefsCliente";
import { columnsDefsOs } from "../../../shared/constants/columnsDefsOs";
import { Menu } from "../../menu/Menu";

export const OrdemServico = () => {

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

    const endereco = "/os"
    useEffect(() => {
        list(endereco);
    }, [actualData])


    const list = useCallback(async (endereco) => {
        await requestGet(endereco).then(
            async (resposta) => {
                const response = await resposta.data;
                setRowData(response)
                setActualData(response)
            }
        )
    }, []);

    const excluirCliente = async (id: string) => {
        const resposta = await requestDelete(`/os/${id}`)
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
                                <h2>Ordem Serviço</h2>
                                    <Button variant="success" onClick={() => setShowCreation(true)}>&#xE147; Adicionar</Button>
                                </div>
                            </div>
                        </div>
                        {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                        <Table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    {
                                        columnsDefsOs.map(({ headerName }) => { return <th>{headerName}</th> })
                                    }
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rowData.map((res: any) => {
                                        return <tr>
                                            <td>{res["descricao"]}</td>
                                            <td>{res["valorTotal"]}</td>
                                            <td>{res["finished_at"] ?? 'N/A'}</td>
                                            <td>{res["status"]["description"]}</td>
                                            <td>{res["automovel"]["plate"]}</td>
                                            <td>{res["automovel"]["cliente"]["name"]}</td>
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
            {showCreation ? (<OrdemServicoCriacao show={showCreation} onClose={() => setShowCreation(false)} />) : null}

        </>

    );
}