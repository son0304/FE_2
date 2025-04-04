import { Card, Steps, Table, Tag } from "antd";
import { useParams } from "react-router-dom";
import { useResourceById } from "../../../Hooks/useResource";

const OrderDetail = () => {
    const { id } = useParams<string>();
    const { data, isLoading } = useResourceById("orders", id || "");

    if (!id) return <p>Không có đơn hàng</p>;
    if (isLoading) return <p>Đang tải...</p>;
    if (!data) return <p>Không tìm thấy dữ liệu đơn hàng</p>;

    // Xác định trạng thái đơn hàng
    const statusIndex = ["pending", "confirmed", "ready", "shipped"].indexOf(data.status);
    const statusColors: any = {
        pending: "orange",
        confirmed: "blue",
        ready: "cyan",
        shipped: "green",
    };

    return (
        <div className="container my-5 p-4">
            <h1 className="text-center text-primary mb-4">Chi Tiết Đơn Hàng</h1>
            <Card bordered={true} className="mb-4">
                <h3 className="text-center">Mã đơn hàng: <Tag color="blue">{data.id}</Tag></h3>

                {/* Hiển thị trạng thái đơn hàng */}
                <Steps
                    current={statusIndex}
                    items={[
                        { title: "Tạo đơn" },
                        { title: "Xác nhận" },
                        { title: "Chuẩn bị hàng" },
                        { title: "Đang giao" },
                    ]}
                />

                {/* Thông tin người nhận */}
                <div className="mt-4">
                    <p><strong>Người nhận:</strong> {data.recipient_name}</p>
                    <p><strong>Địa chỉ giao hàng:</strong> {data.address}</p>
                    <p><strong>Số điện thoại:</strong> {data.phone}</p>
                    <p><strong>Thời gian giao:</strong> {data.date} - {data.time}</p>
                </div>

                
            </Card>

            {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
            <Card title="Danh sách sản phẩm" bordered={true}>
                <Table
                    dataSource={data.products}
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
