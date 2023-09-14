import axios from "axios";


interface Props {
    baseURL: string;
    path: string;
    method: 'get' | 'post',
    params: { [key: string]: string },
}


const instance = axios.create({
    baseURL:'http://127.0.0.1:3020' ,
    timeout: 1000,
    headers: {'Research-Custom-Header': 'stock'}
});


const get = async (url, params = {}, config = {}) => {
    const res = await instance.get(url, { ...config, params  });
    const status = res.status;
    const resHeaders = res.headers;
    console.log(status)
    const data = res.data;
    return data;
}

const request =  {
    get
}


export { request }