import React, { useContext } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../Context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  // Split menu_list into two arrays for two rows
  const firstRowItems = menu_list.slice(0, 8);
  const secondRowItems = menu_list.slice(8, 16);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes.
      </p>

      <div className="explore-menu-list">
        {/* First Row */}
        <div className="explore-menu-list-row">
          {firstRowItems.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item" // Removed active class
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="menu-item-image"
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="explore-menu-list-row">
          {secondRowItems.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item" // Removed active class
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="menu-item-image"
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
