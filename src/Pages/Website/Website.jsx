import React from 'react';
import {Outlet} from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import NavbarWebsite from '../../Layout/Website/Navbar';

const Website = () => {

  return (
    <div>
      <NavbarWebsite />
      <Outlet />
    </div>
  );
};

export default Website;
