import React, { useContext, useState } from "react";
import "./Navbar.css";
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
            setIsMenuOpen(false); // Close the menu when an item is clicked
          }}
          className={`${menu === "home" ? "active" : ""}`}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
            setIsMenuOpen(false); // Close the menu when an item is clicked
          }}
          className={`${menu === "menu" ? "active" : ""}`}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setMenu("mob-app");
            setIsMenuOpen(false); // Close the menu when an item is clicked
          }}
          className={`${menu === "mob-app" ? "active" : ""}`}
        >
          Mobile App
        </a>
        <a
          href="#offers"
          onClick={() => {
            setMenu("offers");
            setIsMenuOpen(false); // Close the menu when an item is clicked
          }}
          className={`${menu === "offers" ? "active" : ""} offer-link`}
        >
          Offers
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("contact");
            setIsMenuOpen(false); // Close the menu when an item is clicked
          }}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          Contact Us
        </a>
      </div>

      {/* Hamburger Menu Box */}
      <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <a href="#explore-menu" onClick={() => setIsMenuOpen(false)}>
          Menu
        </a>
        <a href="#app-download" onClick={() => setIsMenuOpen(false)}>
          Mobile App
        </a>
        <a href="#offers" onClick={() => setIsMenuOpen(false)}>
          Offers
        </a>
        <a href="#footer" onClick={() => setIsMenuOpen(false)}>
          Contact Us
        </a>
      </div>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <Link to="/cart" className="navbar-search-icon">
          <img className="basket-icon" src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
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
    </div>
  );
};

export default Navbar;
