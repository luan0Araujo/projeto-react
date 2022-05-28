import { useEffect, useState } from "react"
import './csMessage.css'

export const Message = (msg:any, type:any) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg.msg) {
            return setVisible(false)
            
        }
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false)}, 3000 )
        
        return 
    }, [msg])

    return ( 
        <>
            {visible && ( <div className={'error'}>{msg.msg}</div>)}
        </>
   
    )
}