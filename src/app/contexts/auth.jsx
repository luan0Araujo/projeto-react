import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSession, api } from "../shared/Api/Api";

export const AuthContext = createContext();

export const AuthProvicer = ( {children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('token')

        if(recoveredUser != null){
            setUser(recoveredUser)
        }
        setLoading(false);

    }, []);

    const login =  async (data) => {

        const response = await createSession(data)
        console.log("login: ", response)

        if(response.status === 403){
            return response.data.error.toString();
        }

        const token = response.data.token;
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(token);
        navigate("/menu");
   
    }
    const logout = () => {
        
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/entrar")
    }

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}