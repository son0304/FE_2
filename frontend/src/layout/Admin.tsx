import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{ boxShadow: "2px 0 10px rgba(0,0,0,0.1)" }}
      >
        <div
          className="logo"
          style={{
            textAlign: "center",
            padding: "16px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {collapsed ? "A" : "Admin Panel"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          style={{ padding: "10px 0" }}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/admin/dashboard">Dashboard</Link>,
              style: { marginBottom: "10px" },
            },
            {
              key: "users",
              icon: <UserOutlined />,
              label: <Link to="/admin/users">Quản lý người dùng</Link>,
              style: { marginBottom: "10px" },
            },
            {
              key: "products",
              icon: <ShoppingCartOutlined />,
              label: <Link to="/admin/product">Quản lý sản phẩm</Link>,
              style: { marginBottom: "10px" },
            },
            {
              key: "client",
              icon: <HomeOutlined />,
              label: <Link to="/">Quay về Client</Link>,
              style: { marginBottom: "10px" },
            },
          ]}
        />
      </Sider>

      {/* Nội dung chính */}
      <Layout>
        {/* Navbar */}
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            fontWeight: "bold",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px" }}
          />
          Admin Dashboard
          <div></div>
        </Header>

        {/* Nội dung thay đổi ở đây */}
        <Content
          style={{
            margin: "20px",
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
