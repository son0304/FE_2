import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Space, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const ClientHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userMenu = {
    items: [
      {
        key: "user",
        label: <b>{user?.name}</b>,
        disabled: true,
      },
      {
        key: "logout",
        label: "Đăng xuất",
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <header className={`header-area header-sticky ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo">
                <h1>Sweet</h1>
              </Link>
              <ul className="nav">
                <li><Link to="/" className="active">Home</Link></li>
                <li><Link to="/product">Products</Link></li>
                <li><Link to="/listOrder">Order</Link></li>
                <li><Link to="/product-details">Product Details</Link></li>
                <li>
                  <Link to="/cart">
                    <i className="fas fa-shopping-cart fa-lg"></i>
                  </Link>
                </li>
                <li>
                  {user ? (
                    <Dropdown menu={userMenu} trigger={["hover"]}>
                      <Space style={{ cursor: "pointer" }}>
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span>{user.name}</span>
                      </Space>
                    </Dropdown>
                  ) : (
                    <Link to="/login">Đăng nhập</Link>
                  )}
                </li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
