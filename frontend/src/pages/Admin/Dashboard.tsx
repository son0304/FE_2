import { Layout, Menu, Card, Row, Col, Table, Statistic } from "antd";
import { Line } from "@ant-design/charts";
import { DashboardOutlined, ShoppingCartOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const data = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 8000 },
    { month: "Mar", revenue: 6000 },
    { month: "Apr", revenue: 10000 },
  ];

  const chartConfig = {
    data,
    xField: "month",
    yField: "revenue",
    point: { size: 5, shape: "diamond" },
    smooth: true,
  };

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Total", dataIndex: "total", key: "total" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  const orders = [
    { id: "001", customer: "John Doe", total: "$120", status: "Completed" },
    { id: "002", customer: "Jane Smith", total: "$90", status: "Pending" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>Admin Dashboard</Header>
        <Content style={{ margin: "16px" }}>
          <Row gutter={16}>
            <Col span={6}><Card><Statistic title="Total Revenue" value={12000} prefix={<DollarOutlined />} /></Card></Col>
            <Col span={6}><Card><Statistic title="Orders" value={240} prefix={<ShoppingCartOutlined />} /></Card></Col>
            <Col span={6}><Card><Statistic title="Customers" value={500} prefix={<UserOutlined />} /></Card></Col>
          </Row>
          <Card title="Revenue Chart" style={{ marginTop: 16 }}>
            <Line {...chartConfig} />
          </Card>
          <Card title="Recent Orders" style={{ marginTop: 16 }}>
            <Table columns={columns} dataSource={orders} pagination={false} rowKey="id" />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;