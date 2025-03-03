/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import useAxios from '../hooks/useAxios';
import {BASEURL, CATEGORY} from '../Api/endPoint';
import {Link} from 'react-router-dom';

const Category = () => {
  let [category, setCategory] = useState([]);
  async function getCategory() {
    let {data, errorMessage} = await useAxios.getCategory(`${BASEURL}/${CATEGORY}`);
    if (!errorMessage) Category(data);
  }
  async function deleteCategory(id) {
    let {errorMessage} = await useAxios.deleteUser(`${BASEURL}/${CATEGORY}/${id}`);
    console.log(errorMessage);
    if (!errorMessage) getCategory();
  }
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div>
      <h2>Category</h2>
      <table className='table table-dark table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>IMAGE</th>
            <th>CREATE AT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {category &&
            category.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.created_at?.slice(0, 10)}</td>
                  <td>
                    <div className='d-flex column-gap-3'>
                      <Link className='edit-user' to={`/dashboard/edit-user/${element.id}`}>
                        <i className='text-warning ri-edit-fill'></i>
                      </Link>
                      <i onClick={() => deleteCategory(element.id)} className='delete-user text-danger ri-delete-bin-6-fill'></i>
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

export default Category;
