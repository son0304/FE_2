import React from "react";
import { useParams } from "react-router";
import {
  usePatchResource,
  useResourceById,
} from "../../../Hooks/useResource";
import {
  Card,
  Table,
  Descriptions,
  Image,
  Select,
  message,
  Row,
  Col,
  Tag,
} from "antd";

const { Option } = Select;

const renderStatusTag = (status: string) => {
  const colorMap: Record<string, string> = {
    created: "red",
    confirmed: "blue",
    ready: "green",
    shipped: "warning",
    done: "lime",
    cancel: "default",
  };
  return <Tag color={colorMap[status] || "default"}>{status.toUpperCase()}</Tag>;
};

const OrderDetailAdmin = () => {
  const { id } = useParams() as { id: string };
  const { data, isLoading, refetch } = useResourceById("orders", id);
  const patchOrder = usePatchResource("orders");

  const handleStatusChange = async (value: string) => {
    try {
      await patchOrder.mutateAsync({ id, values: { status: value } });
      message.success("Cập nhật trạng thái thành công");
      refetch();
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại");
    }
  };

  if (isLoading || !data) return <p>Đang tải dữ liệu...</p>;

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (img: string) => <Image width={80} src={img} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_: any, record: any) =>
        `${(record.price * record.quantity).toLocaleString()} đ`,
    },
  ];

  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Chi tiết đơn hàng #{id}</span>
          {renderStatusTag(data.status)}
        </div>
      }
    >
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Descriptions bordered column={1} title="Thông tin đơn hàng">
            <Descriptions.Item label="Trạng thái">
              <Select
                value={data.status}
                style={{ width: 200 }}
                onChange={handleStatusChange}
              >
                <Option value="created">Created</Option>
                <Option value="comfirm">Comfirm</Option>
                <Option value="ready">Ready</Option>
                <Option value="shipped">Shipped</Option>
                <Option value="done">Done</Option>
                <Option value="cancel">Cancel</Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              <strong>{data.totalPrice.toLocaleString()} đ</strong>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo đơn">
              {new Date(data.createdAt).toLocaleString("vi-VN")}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian giao hàng">
              {data.date} lúc {data.time}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} md={12}>
          <Descriptions bordered column={1} title="Thông tin khách hàng">
            <Descriptions.Item label="Người nhận">
              {data.recipient_name}
            </Descriptions.Item>
            <Descriptions.Item label="SĐT">{data.phone}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ giao hàng">
              {data.address}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <h3 style={{ marginTop: 24 }}>Danh sách sản phẩm</h3>
      <Table
        dataSource={data.products || []}
        columns={columns}
        rowKey="productId"
        pagination={false}
        locale={{ emptyText: "Không có sản phẩm nào trong đơn hàng" }}
      />
    </Card>
  );
};

export default OrderDetailAdmin;
