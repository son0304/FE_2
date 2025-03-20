import React from "react";
import { Layout, Breadcrumb } from "antd";
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import AdminFooter from "../components/AdminFooter";


const { Content } = Layout;

const Admin: React.FC = () => {
  return (
    <Layout >
      <Layout style={{ margin: "10px" }}>
      <AdminHeader />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: "0 24px 24px" }}>
         
          <Content
            style={{
              padding: 24,
              marginTop: 16,
              minHeight: 650,
              background: "#fff",
              borderRadius: "10px 10px 10px 10px",
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
      <AdminFooter/>
      </Layout>
    </Layout>
  );
};

export default Admin;
