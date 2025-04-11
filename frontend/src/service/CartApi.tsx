import axios from "axios";
import { ICart, IProductInCart } from "../interface/ICart";

const url = "http://localhost:3000/carts";

export class CartApi {
    //Cart của user
    static async getCart(userId: string): Promise<ICart | null> {
        const res = await axios.get<ICart[]>(`${url}?userId=${userId}`);
        return res.data.length ? res.data[0] : null
    }

    //addtocart
    static async addToCart(userId: string, product: IProductInCart) {
        let cart = await this.getCart(userId);//lấy giỏ hàng của user
        //tạo mới giỏ hàng
        if (!cart) {
            cart = {
                id: `user_${userId}`,
                userId,
                products: [product],
                totalPrice: product.price * product.quantity,
            },
                await axios.post(url, cart);//thêm mới sp vào db
        } else {
            //tìm xem sp tồn tại trong giỏ hàng chưa
            const existProduct = cart.products.find(item => item.id === product.id);
            //nếu có thì tăng sl
            if (existProduct) {
                existProduct.quantity += product.quantity;
            } else {
                //chưa có thì thêm vào
                cart.products.push(product);
                // cart.totalPrice += product.price * product.quantity;
            }

            //tổng giá rồi lưu lại
            cart.totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);
            //cập nhật vào db
            await axios.put(`${url}/${cart.id}`, cart);
        }
    }

    static async updateQuantity(userId: string, id: string, quantity: number) {
        let cart = await this.getCart(userId);
        if (!cart) return;

        const product = cart.products.find(item => item.id === id);
        if (!product) return;

        //Nếu = 1 và giảm thì xóa sản phẩm, nếu > 1 thì cập nhật
        if (quantity === -1 && product.quantity === 1) {
            cart.products = cart.products.filter(item => item.id !== id);
        } else {
            product.quantity += quantity;
        }

        // Cập nhật tổng tiền
        cart.totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

        // Nếu giỏ hàng trống sau khi xóa sản phẩm cuối cùng, xóa luôn giỏ hàng
        if (cart.products.length === 0) {
            await axios.delete(`${url}/${cart.id}`);
        } else {
            await axios.put(`${url}/${cart.id}`, cart);
        }
    }
}