import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="fw-bold text-center">Admin Panel</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/users">Quản lý người dùng</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/products">Quản lý sản phẩm</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Quay về Client</Link>
          </li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <span className="navbar-brand fw-bold">Admin Dashboard</span>
        </nav>

        {/* NỘI DUNG CHÍNH SẼ THAY ĐỔI Ở ĐÂY */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
