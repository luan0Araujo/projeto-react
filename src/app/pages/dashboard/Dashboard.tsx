
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


export const Dashboard = () => {

    const [msg, setMsg] = useState();
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState()
    const {register, handleSubmit, setValue} = useForm();

    const onSubmit = async (data: any) => {
        console.log(data)

    }
    

    return (
        <div>
            
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("automovelId")}></input>
      <button type="submit"></button>
    </form>
        </div>
    );
}