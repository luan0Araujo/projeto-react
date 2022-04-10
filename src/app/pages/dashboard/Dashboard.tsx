import { useState } from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {

    const [showElement, setShowElement] = useState(false)
    const showOrHide = () => {
        if(showElement === true){
            setShowElement(false)

        }
        else{
            setShowElement(true)
        }
    }
    return (
        <div>
            <div>
                <button onClick={showOrHide}>Clique em mim</button>
                { showElement ? <p>Tô aqui</p> : null }
            </div>
            <h1>Dashboard</h1>
            <Link to='/entrar'>Login</Link>
        </div>
    );
}