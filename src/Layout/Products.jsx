/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import useAxios from '../hooks/useAxios';
import {BASEURL, CATEGORIES, CATEGORY, PRODUCTS} from '../Api/endPoint';
import {Link} from 'react-router-dom';

const Products = () => {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  async function getProducts() {
    let {data, errorMessage} = await useAxios.getProducts(`${BASEURL}/${PRODUCTS}`);
    if (!errorMessage) {
      setProducts(data);
      setLoading(false);
    }
  }
  async function deleteCategory(id) {
    let {errorMessage} = await useAxios.deleteCategory(`${BASEURL}/${CATEGORY}/${id}`);
    if (!errorMessage) getProducts();
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <h2>Products</h2>
      <table className='table table-dark table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>PRICE</th>
            <th>DISCOUNT</th>
            <th>ABOUT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products && !loading ? (
            products.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.title}</td>
                  <td>{element.description}</td>
                  <td>{element.price}</td>
                  <td>{element.discount}</td>
                  <td>{element.About}</td>
                  <td>
                    <div className='d-flex column-gap-3'>
                      <Link className='edit-user' to={`/dashboard/edit-product/${element.id}`}>
                        <i className='text-warning ri-edit-fill'></i>
                      </Link>
                      <i onClick={() => deleteCategory(element.id)} className='delete-user text-danger ri-delete-bin-6-fill'></i>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className='text-center'>
                Loading
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
