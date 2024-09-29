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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
        <Link
          to="#explore-menu" // Changed from <a> to <Link>
          onClick={() => {
            scrollToElement("explore-menu"); // Use scrollToElement function
            setMenu("menu");
            setIsMenuOpen(false);
          }}
          className={`${menu === "menu" ? "active" : ""}`}
        >
          Menu
        </Link>
        <Link
          to="#app-download" // Changed from <a> to <Link>
          onClick={() => {
            scrollToElement("app-download"); // Change if necessary
            setMenu("mob-app");
            setIsMenuOpen(false);
          }}
          className={`${menu === "mob-app" ? "active" : ""}`}
        >
          Mobile App
        </Link>
        <Link
          to="#footer" // Changed from <a> to <Link>
          onClick={() => {
            scrollToElement("footer"); // Change if necessary
            setMenu("contact");
            setIsMenuOpen(false);
          }}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          Contact Us
        </Link>
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
      <div className="hamburger" onClick={toggleMenu}>
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
                scrollToElement("explore-menu");
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
                scrollToElement("app-download");
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
                scrollToElement("footer");
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
