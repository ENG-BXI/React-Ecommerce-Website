/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import useAxios from '../hooks/useAxios';
import {BASEURL, CATEGORIES, CATEGORY, PRODUCT, PRODUCTS} from '../Api/endPoint';
import {Link} from 'react-router-dom';
import PaginatedItems from '../Components/Dashboard/Pagination/Pagination';

const Products = () => {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  const numberOfRow = 4;
  const [page, setPage] = useState(1);
  let dataAfterPaginate = [];
  let [numberOfPages, setNumberOfPages] = useState(0);
  async function getProducts() {
    let {data, errorMessage} = await useAxios.getProducts(`${BASEURL}/${PRODUCTS}`);
    if (!errorMessage) {
      dataAfterPaginate = data.slice((page - 1) * numberOfRow, page * numberOfRow);
      setNumberOfPages(data.length / numberOfRow);
      setProducts(dataAfterPaginate);
      setLoading(false);
    }
  }
  async function deleteCategory(id) {
    let {errorMessage} = await useAxios.deleteProduct(`${BASEURL}/${PRODUCT}/${id}`);
    if (!errorMessage) getProducts();
  }
  useEffect(() => {
    getProducts();
  }, [page]);
  return (
    <div>
      <h2>Products</h2>
      <table className='table table-dark table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>IMAGES</th>
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
                  <td>
                    <div style={{width: '250px', maxHeight: '200px', overflowY: 'clip'}} className='d-flex align-items-start flex-wrap gap-1'>
                      {element.images.map((img, index) => (
                        <img width={'100px'} src={img.image} alt='ProductImage' />
                      ))}
                    </div>
                  </td>
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
      <PaginatedItems setPage={setPage} PageCount={numberOfPages} />
    </div>
  );
};

export default Products;
