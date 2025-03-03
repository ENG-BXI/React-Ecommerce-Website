import React, {useContext} from 'react';
import {userContext} from '../../Context/userContext';
import {Outlet} from 'react-router-dom';
import Page403 from './page403';

const ProtectedRole = props => {
  let roles = [...props.roles, '1995'];
  let {user} = useContext(userContext);
  console.log(user.role);

  return roles.includes(user.role) ? <Outlet /> : <Page403 />;
};

export default ProtectedRole;
