import { Layout } from 'antd';
import React from 'react';

const { Footer } = Layout;

const AdminFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff', borderRadius: '10px' }}>
      &copy; 2024 Admin Panel | Powered by Ant Design
    </Footer>
  );
};

export default AdminFooter;
