// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Navbar.css'; // Import your CSS file
import { assets } from '../../assets/assets'; // Assuming this contains your image paths

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo22' src={assets.logo22} alt='Logo' />
      <img className='profile' src={assets.profile_image} alt='Profile' />
    </div>
  );
};

export default Navbar;
