import axios from "axios";

export const api = axios.create({

    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `token ${localStorage.getItem('token')}`
    },
    
});

export const createSession = async (data:any) => {
    return api.post("/login", data).catch(function (error) {
          return error.response
      });
}

export const requestPost = (end:string, data:any) => {
    return  api.post(end, data)
    .catch((err) => {
        return err.response
    });
}

export const requestPut = (end:string, data:any) => {
    return  api.put(end, data)
    .catch((err) => {
        return err.response
    });
}

export const requestDelete = (end:string) => {
    return  api.delete(end)
    .catch((err) => {
        return err.response
    });
}

export const requestGet = (end:string) => {

    return api.get(end)
    .catch(function (err) {
        return err.response
    })
     
}

