import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ClientHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header-area header-sticky ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* Logo */}
              <Link to="/" className="logo">
                <h1>Sweet</h1>
              </Link>
              {/* Menu */}
              <ul className="nav">
                <li><Link to="/" className="active">Home</Link></li>
                <li><Link to="/product">Products</Link></li>
                <li><Link to="/product-details">Product Details</Link></li>
                <li><Link to="/cart"><i className="fas fa-shopping-cart fa-lg"></i></Link></li>
                <li><Link to="/signin">Sign In</Link></li>
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
