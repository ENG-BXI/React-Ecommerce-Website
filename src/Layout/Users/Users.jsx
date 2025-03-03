import React, {useContext, useEffect, useState} from 'react';
import useAxios from '../../hooks/useAxios';
import {BASEURL, USER, USERS} from '../../Api/endPoint';
import './Users.css';
import {Link} from 'react-router-dom';
import {userContext} from '../../Context/userContext';
const Users = () => {
  let [users, setUsers] = useState([]);
  let {user} = useContext(userContext);
  async function getUsers() {
    let {data, errorMessage} = await useAxios.getUsers(`${BASEURL}/${USERS}`);
    console.log(errorMessage);
    console.log('users is => ', data);
    setUsers(data);
  }
  async function deleteUser(id) {
    let {errorMessage} = await useAxios.deleteUser(`${BASEURL}/${USER}/${id}`);
    console.log(errorMessage);
    if (!errorMessage) getUsers();
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table className='table table-dark table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER NAME</th>
            <th>EMAIL</th>
            <th>CREATE AT</th>
            <th>ROLE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.created_at?.slice(0, 10)}</td>
                  <td>{element.role === '1991' ? 'Admin' : element.role === '2001' ? 'User' : 'Writer'}</td>
                  <td>
                    <div className='d-flex column-gap-3'>
                      <Link className='edit-user' to={`/dashboard/edit-user/${element.id}`}>
                        <i className='text-warning ri-edit-fill'></i>
                      </Link>
                      {element.id !== user.id && <i onClick={() => deleteUser(element.id)} className='delete-user text-danger ri-delete-bin-6-fill'></i>}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
