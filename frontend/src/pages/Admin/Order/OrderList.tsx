import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { useListResources } from "../../../Hooks/useResource";
import { Link } from "react-router-dom";
import Search from "antd/es/transfer/search";
import Input from "rc-input";

const OrderList: React.FC = () => {
    const { data, isLoading } = useListResources("orders");
    const [currentPage, setCurrentPage] = useState(1);

    if (isLoading) return <p>Đang tải...</p>;

    const renderStatus = (status: string) => {
        const colors: Record<string, string> = {
            created: "orange",
            comfirm: "blue",
            ready: "geekblue",
            shiped: "cyan",
            delivering: "cyan",
            done: "green",
            cancel: "red",
        };
        return <Tag color={colors[status] || "default"}>{status.toUpperCase()}</Tag>;
    };

    const columns = [
        {
            title: "Mã Đơn Hàng",
            dataIndex: "id",
            render: (id: string) => <Link to={`/admin/order/detail/${id}`}><Tag color="blue">{id}</Tag></Link>,
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            render: renderStatus,
        },
        {
            title: "Tên & Mã Sản Phẩm",
            dataIndex: "products",
            render: (products: any[]) => (
                <div>
                    {products?.map((product) => (
                        <div key={product.id || product.productId} style={{ marginBottom: 6 }}>
                            <b>{product.name}</b><br />
                            <Tag color="purple">Mã: {product.id || product.productId}</Tag><br />
                            <span>Số lượng: {product.quantity}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: "Thông Tin Khách Hàng",
            render: (_: any, record: any) => (
                <div>
                    <strong>{record.recipient_name}</strong><br />
                    <span>{record.phone}</span><br />
                    <small>{record.address}</small>
                </div>
            ),
        },
        {
            title: "Thời Gian Tạo",
            dataIndex: "createdAt",
            render: (date: string) => new Date(date).toLocaleString(),
        },
    ];

    return (
        <>

            <div className="my-3 row">
                <div className="col-8">
                    <Search placeholder="Search..." />
                </div>
                <div className="col-4">
                    <Search placeholder="Search..." />
                </div>

            </div>

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
        </>
    );
};

export default OrderList;
