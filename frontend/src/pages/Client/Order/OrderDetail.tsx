import { Card, Steps, Table, Tag, Select, message } from "antd";
import { useParams } from "react-router-dom";
import { useResourceById } from "../../../Hooks/useResource";
import { useState, useEffect } from "react";
import axios from "axios";

const { Option } = Select;

const OrderDetail = () => {
    const { id } = useParams<string>();
    const { data, isLoading, refetch } = useResourceById("orders", id || "");
    const [status, setStatus] = useState("created");

    useEffect(() => {
        if (data?.status) setStatus(data.status);
    }, [data?.status]);

    if (!id) return <p>Không có đơn hàng</p>;
    if (isLoading) return <p>Đang tải...</p>;
    if (!data) return <p>Không tìm thấy dữ liệu đơn hàng</p>;

    const steps = [
        { key: "created", title: "Tạo đơn" },
        { key: "comfirm", title: "Xác nhận" },
        { key: "ready", title: "Chuẩn bị hàng" },
        { key: "shipped", title: "Đang giao" },
        { key: "done", title: "Hoàn thành" },
    ];

    const statusColors: Record<string, string> = {
        created: "orange",
        comfirm: "blue",
        ready: "cyan",
        shipped: "purple",
        done: "green",
        cancel: "red",
    };

    const normalizedStatus = status === "delivering" ? "shipped" : status;
    const stepIndex = steps.findIndex((step) => step.key === normalizedStatus);

    const handleStatusChange = async (value: string) => {
        try {
            await axios.patch(`/api/orders/${id}`, { status: value });
            message.success("Cập nhật trạng thái thành công");
            setStatus(value);
            refetch();
        } catch (error) {
            console.error(error);
            message.error("Cập nhật thất bại");
        }
    };

    return (
        <div className="container my-5 p-4">
            <h1 className="text-center text-primary mb-4">Chi Tiết Đơn Hàng</h1>

            <Card bordered className="mb-4">
                <h3 className="text-center">
                    Mã đơn hàng: <Tag color="blue">{data.id}</Tag>
                    <Tag color={statusColors[status] || "default"} className="ms-2">
                        {status.toUpperCase()}
                    </Tag>
                </h3>

                <Steps current={stepIndex} items={steps.map((s) => ({ title: s.title }))} />

                <div className="mt-4">
                    <p><strong>Người nhận:</strong> {data.recipient_name}</p>
                    <p><strong>Địa chỉ:</strong> {data.address}</p>
                    <p><strong>SĐT:</strong> {data.phone}</p>
                    <p><strong>Thời gian giao:</strong> {data.date} - {data.time}</p>
                </div>

            </Card>

            <Card title="Danh sách sản phẩm" bordered>
                <Table
                    dataSource={data.products as any[]}
                    pagination={false}
                    rowKey={(item: any) => item.productId || item.id}
                    columns={[
                        {
                            title: "Ảnh",
                            dataIndex: "image",
                            render: (url: string) => (
                                <img
                                    src={url}
                                    alt="product"
                                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                                />
                            ),
                        },
                        { title: "Tên sản phẩm", dataIndex: "name" },
                        { title: "Số lượng", dataIndex: "quantity", align: "center" },
                        {
                            title: "Giá",
                            dataIndex: "price",
                            align: "right",
                            render: (price: number) => `${price.toLocaleString()} VND`,
                        },
                    ]}
                />
                <h5 className="text-end mt-3 text-danger">
                    Tổng tiền: {data.totalPrice.toLocaleString()} VND
                </h5>
            </Card>
        </div>
    );
};

export default OrderDetail;
