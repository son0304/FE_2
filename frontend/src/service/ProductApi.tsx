import axios from "axios";
import { IProduct } from "../interface/IProduct";

export class ProductApi {
    private url: string;

    constructor() {
        this.url = ("http://localhost:3000/products")
    }

    async getProducts(): Promise<IProduct[] | undefined> {
        const res = await axios.get<IProduct[]>(this.url);
        return res.data
    }

    async deleteProduct(id: string) {
        const res = await axios.delete(this.url+`/${id}`);
        return res.data;
    }

    async getProductById(id: any): Promise<IProduct | undefined> {
        const res = await axios.get<IProduct>(this.url+`/${id}`);
        return res.data;
    }

    async postProduct(data: any) {
        const res = await axios.post(this.url, data, {
            headers: { "Content-Type": "application/json" },
        });
        return res.data;
    }

    async putProduct(id: string, data: any) {
        const res = await axios.put(this.url+`${id}`, data, {
            headers: { "Content-Type": "application/json" },
        });
        return res.data;
    }
}
