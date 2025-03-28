import { useEffect, useState } from "react";
import { ICart } from "../../interface/ICart";
import { CartApi } from "../../service/CartApi";
import axios from "axios";
import { Button, Image, message, Table, Card, Space, Typography } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const userId = "2c0e";

const CartDetail = () => {
    const [cart, setCart] = useState<ICart | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            const data = await CartApi.getCart(userId);
            setCart(data);
        };
        fetchCart();
    }, []);
    //update số lượng
    const updateQuantity = async (id: string, quantity: number) => {
        await CartApi.updateQuantity(userId, id, quantity);
        const updatedCart = await CartApi.getCart(userId);
        setCart(updatedCart);
    };
    //xóa sp khỏi giỏ hàng
    const deleteProductInCart = async (id: string) => {
        if (!cart) return;
    
        const updateProducts = cart.products.filter((item) => item.id !== id);
        const totalPrice = updateProducts.reduce((total, item) => total + item.price * item.quantity, 0);//updete giá
    
        try {
            //k có sp thì trả về null
            if (updateProducts.length === 0) {
                await axios.delete(`http://localhost:3000/carts/${cart.id}`);
                setCart(null);
            } else {
                //nếu có sp thì update dữ liệu
                await axios.put(`http://localhost:3000/carts/${cart.id}`, {
                    ...cart,
                    products: updateProducts,
                    totalPrice,
                });
                setCart({ ...cart, products: updateProducts, totalPrice });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: any) => (
                <Space>
                    <Image src={record.image} width={50} />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <Text strong>{price.toLocaleString()} VNĐ</Text>
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (_: any, record: any) => (
                <Space>
                    <Button onClick={() => updateQuantity(record.id, -1)}>-</Button>
                    <Text>{record.quantity}</Text>
                    <Button onClick={() => updateQuantity(record.id, 1)}>+</Button>
                </Space>
            ),
        },
        {
            title: "Tạm tính",
            key: "subtotal",
            render: (_: any, record: any) => (
                <Text strong>{(record.price * record.quantity).toLocaleString()} VNĐ</Text>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: any) => (
                <Button danger icon={<DeleteOutlined />} onClick={() => deleteProductInCart(record.id)} />
            ),
        },
    ];

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
            <Card style={{ textAlign: "center", padding: "20px", width: "100%", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <Title level={2} style={{ textAlign: "center" }}>🛒 Giỏ hàng của bạn</Title>
                <Table 
                    dataSource={cart?.products} 
                    columns={columns} 
                    rowKey="id" 
                    pagination={false}
                    style={{ width: "100%" }} 
                />
                <Space style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <Title level={3}>
                        Tổng tiền: {cart?.totalPrice?.toLocaleString()} VNĐ
                    </Title>
                    <Button 
                        type="primary" 
                        icon={<ShoppingCartOutlined />}  
                        size="large"
                        style={{ width: "180px", fontSize: "16px" }}
                    >
                        Đặt hàng
                    </Button>
                </Space>
            </Card>
        </div>
    );
    
};

export default CartDetail;
