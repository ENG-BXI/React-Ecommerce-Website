import React, {useEffect, useState} from 'react';
import SliderImage from '../../Components/Website/SliderImage';
import axios from 'axios';
import {BASEURL, CATEGORIES, LASTPRODUCT, TOPRATED} from '../../Api/endPoint';
import HomeCategory from './HomeCategory';
import HomeLastProduct from './HomeLastProduct';
import TopRatedProduct from './TopRatedProducts';
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  function getCategories() {
    axios
      .get(`${BASEURL}/${CATEGORIES}`)
      .then(data => {
        setCategories(data.data);
      })
      .catch(err => console.log(err));
  }
  function getProducts() {
    axios.get(`${BASEURL}/${LASTPRODUCT}`).then(data => {
      setProducts(data.data);
    });
  }
  function getTopRatedProduct() {
    axios.get(`${BASEURL}/${TOPRATED}`).then(data => {
      setTopRatedProducts(data.data);
    });
  }
  useEffect(() => {
    getCategories();
    getProducts();
    getTopRatedProduct();
  }, []);
  return (
    <div>
      <SliderImage />
      <HomeCategory category={categories} />
      <HomeLastProduct products={products} />
      <TopRatedProduct topRatedProducts={topRatedProducts} />
    </div>
  );
};

export default Home;
