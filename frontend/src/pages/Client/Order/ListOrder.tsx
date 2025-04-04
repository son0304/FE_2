import { useState } from "react";
import { useListResources } from "../../../Hooks/useResource";
import { Table, Tag, Card } from "antd";
import { Link } from "react-router-dom";

const ListOrder = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const { data: orders } = useListResources("orders");

    // Lọc đơn hàng theo user
    const filterOrder = orders?.filter((order: any) => order.users.some((u: any) => u.id === user.id));

    return (
        <div className="container my-5 p-4">
            <h1 className="text-primary text-center mb-4">Danh Sách Đơn Hàng</h1>
            <div className="row">
                {filterOrder?.map((order: any) => (
                    <div className="col-md-6 mb-4" key={order.id}>
                        <Link to={`/order/detail/${order.id}`}>
                            <Card
                                title={`Người nhận: ${order.recipient_name}`}
                                extra={<Tag color={order.status === "pending" ? "orange" : "green"}>{order.status}</Tag>}
                                bordered={true}
                            >


                                <Table
                                    dataSource={order.products}
                                    pagination={false}
                                    rowKey="productId"
                                    columns={[
                                        {
                                            title: "Tên sản phẩm",
                                            dataIndex: "name",
                                            key: "name",
                                        },
                                        {
                                            title: "Số lượng",
                                            dataIndex: "quantity",
                                            key: "quantity",
                                            align: "center",
                                        },
                                        {
                                            title: "Giá",
                                            dataIndex: "price",
                                            key: "price",
                                            render: (text) => `${text.toLocaleString()} VND`,
                                            align: "right",
                                        }

                                    ]}
                                />

                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListOrder;
