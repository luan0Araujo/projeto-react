
import { useState } from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {

    const [steit, setSteit] = useState('ffr')

    const onClick =  (e:any) =>{
        setSteit('aaaaa')
    }
    const onClick1 =  () =>{
        setSteit('bbbb')
    }

    return (
        <div>
            <input value={steit}></input>
            <form>
                <input></input>
                <button type="button" onClick={onClick}></button>
                <button type="button" onClick={onClick1}></button>
            </form>
        </div>
    );
}