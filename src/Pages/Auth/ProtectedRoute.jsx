import React, {useContext, useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {userContext} from '../../Context/userContext';
import useAxios from '../../hooks/useAxios';
import {BASEURL, USER} from '../../Api/endPoint';
import Cookies from 'universal-cookie';

const ProtectedRoute = () => {
  let {user, setUser} = useContext(userContext);
  let [loading, setLoading] = useState(true);
  let cookie = new Cookies();
  async function getUser() {
    setLoading(true);
    let {data, errorMessage} = await useAxios.getUser(`${BASEURL}/${USER}`);
    if (errorMessage) {
      cookie.remove('Bearer');
    } else {
      setUser(data);
    }
    setLoading(false);
  }
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? <></> : user.name ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
