export const MensagemUsuario = (props: any) => {
    return (
        <>
        <div className={props.type}>{props.msg}</div>
        </>
    )
}