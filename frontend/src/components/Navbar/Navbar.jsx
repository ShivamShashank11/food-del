import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
          href="#offers"
          onClick={() => {
            setMenu("offers");
            setIsMenuOpen(false);
          }}
          className={`${menu === "offers" ? "active" : ""} offer-link`}
        >
          Offers
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
        <img src={assets.search_icon} alt="Search" />
        <Link to="/cart" className="navbar-search-icon">
          <img className="basket-icon" src={assets.basket_icon} alt="Cart" />
          {getTotalCartAmount() > 0 && <div className="dot"></div>}{" "}
          {/* Show dot if cart has items */}
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="sign-in-button">
            Sign In
          </button>
        ) : (
          <div
            className="navbar-profile"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={dropdownRef}
          >
            <img src={assets.profile_icon} alt="Profile" />
            {isDropdownOpen && (
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
            )}
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
