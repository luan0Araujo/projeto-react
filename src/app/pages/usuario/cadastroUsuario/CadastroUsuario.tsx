import { useCallback, useState } from "react";
import api from "../../../shared/Api/Api";

export const CadastroUsuario = () => {
    
    const [nome, setNome] = useState('')
    const [rg, setRg] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleCadastrar = useCallback(() => {
        api.post('/usuarios', {
            name: nome,
            password: senha,
            cpf: cpf,
            email: email, 
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }, [nome, cpf, email, senha]);
    return (
        <div>
            <form>
                <label>
                    <span>Nome </span>
                    <input value={nome} onChange={e => setNome(e.target.value)}/>
                </label>
                <label >
                    <span>RG </span>
                    <input value={rg} onChange={e => setRg(e.target.value)}/>
                </label>
                <label >
                    <span>CPF </span>
                    <input value={cpf} onChange={e => setCpf(e.target.value)}/>
                </label>
                <label >
                    <span>Data de Nascimento </span>
                    <input value={dataNasc} onChange={e => setDataNasc(e.target.value)}/>
                </label>
                <label >
                    <span>Email </span>
                    <input value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <span>Senha </span>
                    <input type="password"  value={senha} onChange={e => setSenha(e.target.value)}/>
                </label>

                <button type="button" onClick={handleCadastrar}>
                    Registrar
                </button>
            </form>
        </div>
    );
};