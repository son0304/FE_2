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
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: "User",
      children: [
        {
          key: "listUser",
          label: <Link to="/admin/user">Danh sách người dùng</Link>,
        },
        {
          key: "user-settings",
          label: <Link to="/user-settings">Cài đặt người dùng</Link>,
        },
      ],
    },
    {
      key: "product",
      icon: <ShoppingCartOutlined />,
      label: "Product",
      children: [
        {
          key: "product-list",
          label: <Link to="/products">Danh sách sản phẩm</Link>,
        },
        {
          key: "add-product",
          label: <Link to="/add-product">Thêm sản phẩm</Link>,
        },
      ],
    },
  ];

  return (
    <Sider width={200} style={{ background: "#fff", borderRadius: "10px", margin: "16px 0", padding: "10px 0" }}>
      <Menu mode="inline" defaultSelectedKeys={["dashboard"]} items={menuItems} />
    </Sider>
  );
};

export default Sidebar;
