import React from 'react';
import SideBar from '../../Components/Dashboard/SideBar/SideBar';
import './Dashboard.css';
import {Outlet} from 'react-router-dom';
const Dashboard = () => {
  return (
    <div className='dashboard d-flex column-gap-2 vh-100'>
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

function Header() {
  return <header style={{height:"50px"}} className='mt-4'>HEADER</header>;
}
