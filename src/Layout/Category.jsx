/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import useAxios from '../hooks/useAxios';
import {BASEURL, CATEGORIES, CATEGORY} from '../Api/endPoint';
import {Link} from 'react-router-dom';

const Category = () => {
  let [category, setCategory] = useState([]);
  let [loading, setLoading] = useState(true);
  async function getCategory() {
    // to solve the getCategory before store Image in backend
    // this is a temp fixed now
    setTimeout(async () => {
      let {data, errorMessage} = await useAxios.getCategory(`${BASEURL}/${CATEGORIES}`);
      if (!errorMessage) {
        setCategory(data);
        setLoading(false);
      }
    }, 1000);
  }
  async function deleteCategory(id) {
    let {errorMessage} = await useAxios.deleteCategory(`${BASEURL}/${CATEGORY}/${id}`);
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
          {category && !loading ? (
            category.map((element, index) => {
              return(
              <tr key={index}>
                <td>{element.id}</td>
                <td>{element.title}</td>
                <td>
                  <img style={{width: '70px'}} src={element.image} alt='CategoryImage' />
                </td>
                <td>{element.created_at?.slice(0, 10)}</td>
                <td>
                  <div className='d-flex column-gap-3'>
                    <Link className='edit-user' to={`/dashboard/edit-category/${element.id}`}>
                      <i className='text-warning ri-edit-fill'></i>
                    </Link>
                    <i onClick={() => deleteCategory(element.id)} className='delete-user text-danger ri-delete-bin-6-fill'></i>
                  </div>
                </td>
              </tr>);
            })
          ) : (
            <tr>
              <td colSpan={5} className='text-center'>Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
