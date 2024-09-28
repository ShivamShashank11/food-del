import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={assets.logo6} alt="Logo" />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navbar Menu */}
        <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={`${menu === "home" ? "active" : ""}`}
            >
              home
            </Link>
          </li>
          <li>
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={`${menu === "menu" ? "active" : ""}`}
            >
              menu
            </a>
          </li>
          <li>
            <a
              href="#app-download"
              onClick={() => setMenu("mob-app")}
              className={`${menu === "mob-app" ? "active" : ""}`}
            >
              mobile app
            </a>
          </li>
          <li>
            <a
              href="#offers"
              onClick={() => setMenu("offers")}
              className={`${menu === "offers" ? "active" : ""}`}
            >
              offers
            </a>
          </li>
          <li>
            <a
              href="#footer"
              onClick={() => setMenu("contact")}
              className={`${menu === "contact" ? "active" : ""}`}
            >
              contact us
            </a>
          </li>
        </ul>

        {/* Right Section: Search, Cart, Profile */}
        <div className="navbar-right">
          <img src={assets.search_icon} alt="Search" />
          <Link to="/cart" className="navbar-search-icon">
            <img className="basket-icon" src={assets.basket_icon} alt="Cart" />
            <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
          </Link>

          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="sign-in-button"
            >
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
      </div>
    </nav>
  );
};

export default Navbar;
