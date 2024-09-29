import React, { useContext, useState } from "react";
import "./Navbar.css"; // Ensure this path is correct
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={assets.logo6} alt="Logo" />
      </Link>
      <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            setIsMenuOpen(false);
          }}
          className={`${menu === "home" ? "active" : ""}`}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
            setIsMenuOpen(false);
          }}
          className={`${menu === "menu" ? "active" : ""}`}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setMenu("mob-app");
            setIsMenuOpen(false);
          }}
          className={`${menu === "mob-app" ? "active" : ""}`}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("contact");
            setIsMenuOpen(false);
          }}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          Contact Us
        </a>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="navbar-cart-icon">
          <div className="cart-icon-container">
            <img className="basket-icon" src={assets.basket_icon} alt="Cart" />
            <div
              className={`dot ${getTotalCartAmount() > 0 ? "visible" : ""}`}
            ></div>
          </div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="sign-in-button">
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* Modal for the responsive menu */}
      {isMenuOpen && (
        <div className="responsive-menu">
          <div className="responsive-menu-content">
            <Link
              to="/"
              onClick={() => {
                setMenu("home");
                setIsMenuOpen(false);
              }}
              className={`${menu === "home" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="#explore-menu"
              onClick={() => {
                setMenu("menu");
                setIsMenuOpen(false);
              }}
              className={`${menu === "menu" ? "active" : ""}`}
            >
              Menu
            </Link>
            <Link
              to="#app-download"
              onClick={() => {
                setMenu("mob-app");
                setIsMenuOpen(false);
              }}
              className={`${menu === "mob-app" ? "active" : ""}`}
            >
              Mobile App
            </Link>
            <Link
              to="#footer"
              onClick={() => {
                setMenu("contact");
                setIsMenuOpen(false);
              }}
              className={`${menu === "contact" ? "active" : ""}`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
