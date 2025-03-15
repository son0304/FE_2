import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { DashboardOutlined, UserOutlined, ShoppingCartOutlined, HomeOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Admin: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider theme="dark" width={250}>
        <div className="logo" style={{ textAlign: "center", padding: "16px", color: "#fff", fontSize: "18px", fontWeight: "bold" }}>
          Admin Panel
        </div>
        <Menu
  theme="dark"
  mode="inline"
  defaultSelectedKeys={["dashboard"]}
  items={[
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Quản lý người dùng</Link>,
    },
    {
      key: "products",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/product">Quản lý sản phẩm</Link>,
    },
    {
      key: "client",
      icon: <HomeOutlined />,
      label: <Link to="/">Quay về Client</Link>,
    },
  ]}
/>

      </Sider>

      {/* Nội dung chính */}
      <Layout>
        {/* Navbar */}
        <Header style={{ background: "#fff", padding: "0 20px", fontWeight: "bold", fontSize: "18px" }}>
          Admin Dashboard
        </Header>

        {/* Nội dung thay đổi ở đây */}
        <Content style={{ margin: "20px", padding: "20px", background: "#fff", borderRadius: "8px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
