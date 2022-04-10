import { useCallback, useState } from "react";
import api from "../../../shared/Api/Api";


export const CadastroAutomovel = () => {


    const [placa, setPlaca] = useState('')
    const [modelo, setModelo] = useState('')
    const [marca, setMarca] = useState('')
    const [cor, setCor] = useState('')
    const [ano, setAno] = useState('')
    const [renavam, setRenavam] = useState('')

    const handleCadastrar = useCallback(() => {
        api.post('/usuarios', {
            placa: placa,
            renavam: renavam,
            marca: marca,
            ano: ano, 
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }, [placa, marca, ano, renavam]);
    return (
        <div>
            <form>
                <label>
                    <span>Placa </span>
                    <input value={placa} onChange={e => setPlaca(e.target.value)}/>
                </label>
                <label >
                    <span>Modelo </span>
                    <input value={modelo} onChange={e => setModelo(e.target.value)}/>
                </label>
                <label >
                    <span>CPF </span>
                    <input value={marca} onChange={e => setMarca(e.target.value)}/>
                </label>
                <label >
                    <span>Data de Nascimento </span>
                    <input value={cor} onChange={e => setCor(e.target.value)}/>
                </label>
                <label >
                    <span>Email </span>
                    <input value={ano} onChange={e => setAno(e.target.value)}/>
                </label>
                <label>
                    <span>Senha </span>
                    <input value={renavam} onChange={e => setRenavam(e.target.value)}/>
                </label>

                <button type="button" onClick={handleCadastrar}>
                    Registrar
                </button>
            </form>
        </div>
    );
}