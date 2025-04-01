import React, { useState } from "react";
import { Table, Tag } from "antd";
import { useListResources } from "../../../Hooks/useResource";

const OrderList: React.FC = () => {
    const { data, isLoading, error } = useListResources("orders");
    const [currentPage, setCurrentPage] = useState(1);

    if (isLoading) return <p>...Loading</p>;

    const columns = [
        {
            title: "Mã Đơn Hàng",
            dataIndex: "id",
            key: "id",
            render: (text: any) => <b style={{ color: "green" }}>{text}</b>,
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            render: (status: any) => {
                const color = status === "pending" ? "orange" : "green";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Tên & Mã Sản Phẩm",
            dataIndex: "products",
            key: "products",
            render: (products: any) => (
                <div>
                    {products.map((product: any) => (
                        <div key={product.id || product.productId} style={{ marginBottom: 8 }}>
                            <b>{product.name}</b> <br />
                            <Tag color="blue">Mã SP: {product.id || product.productId}</Tag> <br />
                            <b>Số lượng:</b> {product.quantity} <br />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: "Thông Tin Khách Hàng",
            dataIndex: "recipient_name",
            key: "recipient_info",
            render: (_: any, record: any) => (
                <div>
                    <b>Người nhận:</b> {record.recipient_name} <br />
                    <b>SĐT:</b> {record.phone} <br />
                    <b>Địa chỉ:</b> {record.address} <br />
                </div>
            ),
        },
        {
            title: "Thời Gian Tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: any) => new Date(text).toLocaleString(),
        },
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{
                current: currentPage,
                pageSize: 4, 
                onChange: (page) => setCurrentPage(page),
            }}
        />
    );
};

export default OrderList;
