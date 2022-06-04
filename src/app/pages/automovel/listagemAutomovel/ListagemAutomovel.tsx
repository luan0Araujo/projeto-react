import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AutomovelCriacao } from "../../../components/AutomovelCriacao";
import { AutomovelEdicao } from "../../../components/AutomovelEdicao";
import { MensagemUsuario } from "../../../components/MensagemUsuario";
import { requestDelete, requestGet } from "../../../shared/Api/Api";
import { columnDefsAutomovel } from "../../../shared/constants/columnDefsAutomovel";
import { Menu } from "../../menu/Menu";

import "./style.css"

export const ListagemAutomovel = (props: any) => {
    const [rowData, setRowData] = useState([]);

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
        const timer = setTimeout(() => { setMessageVisible(false) }, 3000)

        return () => clearTimeout(timer)
    }


    const endereco = "/automovel"
    useEffect(() => {

        list(endereco);

    }, [() => { list(endereco) }])


    const list = useCallback(async (endereco) => {
        const resposta = await requestGet(endereco)

        if (resposta.data[0].birthDate) {
            const data = resposta.data.filter((e: any) => e.birthDate = format(Date.parse(e.birthDate), 'yyyy-MM-dd'))
            setRowData(await data)
        }
        setRowData(await resposta.data)

    }, []);

    const excluirAutomovel = async (id: string) => {
        const resposta = await requestDelete(`/automovel/${id}`)
        if (resposta.status === 200) {
            mensagemUsuario('Excluido com Sucesso', 'success')
        }
        else {
            mensagemUsuario('Erro', 'error')
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
                                <h2>Automoveis</h2>
                                    <Button variant="success" onClick={() => setShowCreation(true)}>&#xE147; Adicionar</Button>
                                </div>
                            </div>
                        </div>
                        {messageVisible ? <MensagemUsuario msg={msg} type={type} /> : null}
                        <Table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    {
                                        columnDefsAutomovel.map(({ headerName }) => { return <th>{headerName}</th> })
                                    }
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rowData.map((res: any) => {
                                        return <tr>
                                            <td>{res["plate"]}</td>
                                            <td>{res["model"]}</td>
                                            <td>{res["brand"]}</td>
                                            <td>{res["color"]}</td>
                                            <td>{res["year"]}</td>
                                            <td>{res["renavam"]}</td>
                                            <td>{res["cliente"]["name"]}</td>
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
            {showEdition ? (<AutomovelEdicao show={showEdition} id={actualId} onClose={() => setShowEdition(false)} />) : null}
            {showCreation ? (<AutomovelCriacao show={showCreation} onClose={() => setShowCreation(false)} />) : null}

        </>

    );
}