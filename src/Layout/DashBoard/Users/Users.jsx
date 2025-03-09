import React, {useContext, useEffect, useState} from 'react';
import useAxios from '../../../hooks/useAxios';
import {BASEURL, USER, USERS} from '../../../Api/endPoint';
import './Users.css';
import {Link} from 'react-router-dom';
import {userContext} from '../../../Context/userContext';
import PaginatedItems from '../../../Components/Dashboard/Pagination/Pagination';
const Users = () => {
  let [users, setUsers] = useState([]);
  let {user} = useContext(userContext);
  let numberOfRow = 5;
  let [pageCount, setPageCount] = useState(0);
  let [page, setPage] = useState(1);
  let [search, setSearch] = useState('');
  async function getUsers() {
    let {data, errorMessage} = await useAxios.getUsers(`${BASEURL}/${USERS}?limit=${numberOfRow}&page=${page}`);
    if (!errorMessage) {
      setPageCount(Math.ceil(data.total / numberOfRow));

      let dataSearched = data.data.filter((element, index) => element.name.toLowerCase().includes(search.toLowerCase()) || element.email.toLowerCase().includes(search.toLowerCase()));
      setUsers(dataSearched);
    }
  }
  async function deleteUser(id) {
    let {errorMessage} = await useAxios.deleteUser(`${BASEURL}/${USER}/${id}`);
    console.log(errorMessage);
    if (!errorMessage) getUsers();
  }
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);
  return (
    <div>
      <h2>Users</h2>
      <input type='search' placeholder='Search' onChange={handleSearch} className='form-control form-control-sm my-4 w-25' />
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
                  <td>{element.role === '1995' ? 'Admin' : element.role === '2001' ? 'User' : element.role === '1999' ? 'Product manger' : 'Writer'}</td>
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
      <PaginatedItems PageCount={pageCount} setPage={setPage} />
    </div>
  );
};

export default Users;
