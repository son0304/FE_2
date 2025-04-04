import { useListResources, usePutResource } from '../../Hooks/useResource';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Image, Space, Table, Typography, InputNumber, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CartDetail = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useListResources("carts");
    const updateCart = usePutResource("carts");

    const userStorage = localStorage.getItem("user");
    const userId = userStorage ? JSON.parse(userStorage).id : null;

    if (!userId) return <p>Vui lòng đăng nhập</p>;

    const userCart = data?.find((cart: any) => cart.users.some((user: any) => user.id === userId)) || {};
    const productCart = userCart?.products || [];
    const totalPrice = productCart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    if (isLoading) return <p>...Loading</p>;

    const onHandleCheckout = () => {
        navigate("/order", { state: { cartItems: productCart } });
    };

    const handleQuantityChange = (value: number, productId: string) => {
        if (value < 1) {
            return;
        }

        const updatedCart = { ...userCart };
        const productIndex = updatedCart.products.findIndex((p: any) => p.id === productId);

        if (productIndex !== -1) {
            updatedCart.products[productIndex].quantity = value;
            updatedCart.totalPrice = updatedCart.products.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

            updateCart.mutate({ id: updatedCart.id, values: updatedCart });
        }
    };

    const handleRemoveProduct = (productId: string) => {
        const updatedCart = { ...userCart };
        updatedCart.products = updatedCart.products.filter((p: any) => p.id !== productId);
        updatedCart.totalPrice = updatedCart.products.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

        updateCart.mutate({ id: updatedCart.id, values: updatedCart });
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
            render: (price: number) => `${price.toLocaleString()} VNĐ`
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity: number, record: any) => (
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => handleQuantityChange(value as number, record.id)}
                />
            ),
        },
        {
            title: "Tạm tính",
            key: "subtotal",
            render: (_: any, record: any) => `${(record.price * record.quantity).toLocaleString()} VNĐ`
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: any) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                    onConfirm={() => handleRemoveProduct(record.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
            <Card style={{ textAlign: "center", padding: "20px", width: "100%", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <Title level={2} style={{ textAlign: "center" }}>🛒 Giỏ hàng của {(JSON.parse(localStorage.getItem("user") || "")).name}</Title>
                <Table
                    dataSource={productCart}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    style={{ width: "100%" }}
                />
                <Space style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <Title level={3}>
                        Tổng tiền: {totalPrice.toLocaleString()} VNĐ
                    </Title>
                    <Button
                        type="primary"
                        size="large"
                        onClick={onHandleCheckout}
                        disabled={productCart.length === 0}
                    >
                        Đặt hàng
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default CartDetail;
