import { useLocation, useNavigate } from "react-router-dom";
import { usePostResource, useResourceById } from "../../../Hooks/useResource";
import { Form, Input, Button, InputNumber, DatePicker, TimePicker, Card, Row, Col } from "antd";
import { useEffect, useState } from "react";

const OrderClient = () => {
    const [product, setProduct] = useState<any>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.id;
    const dataProduct = location.state?.cartItems || [];
    const { data } = useResourceById("products", id);
    const [form] = Form.useForm();
    const { mutate: postOrder } = usePostResource("orders");
    const [quantity, setQuantity] = useState(1);

    const productData = dataProduct.length ? dataProduct : data ? [data] : [];
    const user = JSON.parse(localStorage.getItem("user") || "{}");


    useEffect(() => {
        if (location.state?.cartItems) {
            setProduct(location.state.cartItems);
        } else if (data) {
            setProduct([{
                productId: data?.id,
                name: data?.name,
                price: data?.price,
                image: data?.image,
                quantity: quantity,
            }]);
        }
    }, [location.state?.cartItems, data, quantity]);

    const onHandleSubmit = (values: any) => {
        const orderData = {
            users: [{ id: user.id, name: user.name, phone: user.phone, address: user.address }],
            products: productData.map((item: any) => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: quantity,
            })),
            recipient_name: values.name,
            phone: values.phone,
            address: values.address,
            totalPrice: productData.reduce((sum: any, item: any) => sum + item.price * quantity, 0),
            status: "pending",
            createdAt: new Date().toLocaleString("vi-VN"),
            date: values.date?.format("YYYY-MM-DD"),
            time: values.time?.format("HH:mm"),
        };

        postOrder(orderData, {
            onSuccess: (res) => {
                form.resetFields();
                navigate(`/order/detail/${res.id}`);
            },
        });
    };

    return (
        <div className="p-5" style={{ backgroundColor: "#f5f5f5", borderRadius: 12 }}>
            <h1 className="text-center text-primary fw-bold">Đặt Hàng</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card title="Sản phẩm của bạn" bordered={false}>
                        {productData.map((item: any) => (
                            <Card key={item.id} style={{ marginBottom: 16 }}>
                                <Row gutter={16} align="middle">
                                    <Col span={8}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: 8 }}
                                        />
                                    </Col>
                                    <Col span={16}>
                                        <h3 className="text-primary">{item.name}</h3>
                                        <p>{item.description}</p>
                                        <h4 className="text-danger fw-bold">{item.price.toLocaleString()} VND</h4>
                                        <Form.Item label="Số lượng">
                                            <InputNumber
                                                min={1}
                                                value={quantity}
                                                onChange={(value) => setQuantity(value || 1)}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Thông tin khách hàng" bordered={false}>
                        <Form form={form} layout="vertical" onFinish={onHandleSubmit}>
                            <Form.Item label="Tên khách hàng" name="name" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
                                <Input placeholder="Nhập tên của bạn" />
                            </Form.Item>
                            <Form.Item label="Số điện thoại" name="phone" initialValue={user.phone} rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
                                <Input placeholder="Nhập địa chỉ nhận hàng" />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Ngày giao hàng" name="date">
                                        <DatePicker style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Chọn giờ nhận" name="time" rules={[{ required: true, message: "Vui lòng chọn giờ!" }]}>
                                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <h4 className="fw-bold">Tổng tiền: {productData.reduce((sum: any, item: any) => sum + item.price * quantity, 0).toLocaleString()} VND</h4>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Đặt hàng ngay
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderClient;