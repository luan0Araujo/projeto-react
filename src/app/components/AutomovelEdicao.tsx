import { Modal, Button } from "react-bootstrap"


export const AutomovelEdicao = (props:any) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                <Modal.Title>Automovel</Modal.Title>
                </Modal.Header>
                <Modal.Body>Informações para edição...</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={props.onClose}>
                    Salvar
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}