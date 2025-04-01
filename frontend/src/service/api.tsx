import axios from "axios";

const url = `http://localhost:3000/`;

export const getList = async (resource: string) => {
    const {data} = await axios.get(`${url}${resource}`);
    return data;
};

export const getId  = async (resource: string, id: string) => {
    const {data} = await axios.get(`${url}${resource}/${id}`);
    return data;
}

export const postData = async (resource: string, values: any)=>{
    const {data} = await axios.post(`${url}${resource}`, values);
    return data;
}

export const putData = async (resource: string, id: string, values: any)=>{
    const {data} = await axios.put(`${url}${resource}/${id}`, values);
    return data;
}

export const deleteData = async (resource: string, id: string)=>{
    const {data} = await axios.delete(`${url}${resource}/${id}`);
    return data;
}