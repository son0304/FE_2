import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const AdminHeader: React.FC = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", borderRadius: '10px' }}>
      <h1>Sweet-Cake</h1>
    </Header>
  );
};

export default AdminHeader;
