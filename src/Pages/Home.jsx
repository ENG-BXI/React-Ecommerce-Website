import React, { useEffect} from 'react';
import {BASEURL, USERS} from '../Api/endPoint';
import useAxios from '../hooks/useAxios';

async function getUser() {

  let { data, errorMessage } = await useAxios.getUser(`${BASEURL}/${USERS}`);
  console.log(data);
}
const Home = () => {
  useEffect(() => {
    getUser();
  }, []);
  return <div>Home</div>;
};

export default Home;
