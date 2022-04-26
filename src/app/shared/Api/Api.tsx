import axios from "axios";

export const api = axios.create({

    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    
});

export const createSession = async (data:any) => {
    return api.post("/login", data).catch(function (error) {
          return error.response
      });
}

