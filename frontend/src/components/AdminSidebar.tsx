import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, DashboardOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: <Link to="/admin/user">user</Link>,
    },
    {
      key: "product",
      icon: <ShoppingCartOutlined />,
      label: "Product",
      children: [
        {
          key: "product-list",
          label: <Link to="/admin/products">Danh sách sản phẩm</Link>,
        },
        {
          key: "add-product",
          label: <Link to="/admin/products/create">Thêm sản phẩm</Link>,
        },
      ],
    },
    {
      key: "order",
      icon: <UserOutlined />,
      label: <Link to="/admin/order">Order</Link>,
    },
  ];

  return (
    <Sider width={200} style={{ background: "#fff", borderRadius: "10px", margin: "16px 0", padding: "10px 0" }}>
      <Menu mode="inline" defaultSelectedKeys={["dashboard"]} items={menuItems} />
    </Sider>
  );
};

export default Sidebar;
