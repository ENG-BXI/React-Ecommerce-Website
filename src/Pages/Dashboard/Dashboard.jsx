import React from 'react';
import SideBar from '../../Components/Dashboard/SideBar/SideBar';
import './Dashboard.css';
import {Outlet} from 'react-router-dom';
import Header from '../../Components/Dashboard/Header/Header';
const Dashboard = () => {
  return (
    <div className='dashboard d-flex column-gap-2 '>
      <SideBar />
      <div className='w-100'>
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
