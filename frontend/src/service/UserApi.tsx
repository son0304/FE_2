import axios from "axios";
import { IUser } from "../interface/IUser";


export default class userApi {
    private url: string;
    constructor() {
        this.url = (`http://localhost:3000/users`);
    }
    async getUser(): Promise<IUser[] | undefined> {
        const res = await axios.get<IUser[]>(this.url);
        return res.data;
    }


    async getUserId(id: string): Promise<IUser | undefined> {
        const res = await axios.get<IUser>(this.url + `/${id}`);
        return res.data;
    }


    async postUser(newData: any) {
        const res = await axios.post<IUser[]>(this.url, newData); 
        return res.data;
    }


    async putUser(id: any, newData: any ){
        const res = await axios.put<IUser[]>(this.url + `/${id}`, newData);
        return res.data;
    }

    async deleteUser(id: any){
        const res = await axios.delete<IUser[]>(this.url + `/${id}`);
        return res.data;
    }
}