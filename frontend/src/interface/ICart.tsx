export interface ICart {
    id: string,
    userId: string,
    products: IProductInCart[],
    totalPrice: number
}

export interface IProductInCart {
    id: string,
    name: string,
    price: number,
    image: string,
    quantity: number
}