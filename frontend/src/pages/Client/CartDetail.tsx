import React from 'react';
import { useListResources } from '../../Hooks/useResource';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Image, Space, Table, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CartDetail = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useListResources("carts");

    const productCart = data?.flatMap((cart: any) => cart.products) || [];
    const totalPrice = data?.reduce((sum: number, cart: any) => sum + (cart.totalPrice || 0), 0) || 0;

    console.log(productCart);

    if (isLoading) return <p>...Loading</p>;

    const onHandleCheckout = () => {
        navigate("/order", { state: { cartItems: productCart } });
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
            render: (_: any) => 1 
        },
        {
            title: "Tạm tính",
            key: "subtotal",
            render: (_: any, record: any) => `${record.price.toLocaleString()} VNĐ`
        },
        {
            title: "Hành động",
            key: "action",
            render: () => (
                <Button danger icon={<DeleteOutlined />} />
            ),
        },
    ];

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
            <Card style={{ textAlign: "center", padding: "20px", width: "100%", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <Title level={2} style={{ textAlign: "center" }}>🛒 Giỏ hàng của bạn</Title>
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
                    >
                        Đặt hàng
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default CartDetail;
