import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './addNewProducts.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import useAxios from '../../../hooks/useAxios';
import { BASEURL, CATEGORIES, PRODUCT } from '../../../Api/endPoint';
const EditProduct = () => {
  let [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: ''
  });
  let [images, setImages] = useState([]);
  let nav = useNavigate();
  const {id} = useParams();
  let cookie = new Cookies();
  let refProgress = useRef([]);
  let ids = useRef([]);
  let [category, setCategory] = useState([]);
  let [imageFormServer, setImageFormServer] = useState([]);
  const [imageIdFromSever, setImageIdFromSever] = useState([]);
  let clickUpload = useRef(null);

  useEffect(() => {
    getCategory();
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function ChangeForm(e) {
    setForm({...form, [e.target.id]: e.target.value});
  }
  async function getCategory() {
    let { data, errorMessage } = await useAxios.getCategory(`${BASEURL}/${CATEGORIES}`);
    console.log(data);
    if (!errorMessage) setCategory(data);
  }
  let count = useRef(-1);
  async function HandleChangeImage(e) {
    let images = [...e.target.files];
    setImages(pre => [...pre, ...images]);
    let formData = new FormData();
    for (let index = 0; index < images.length; index++) {
      count.current++;
      formData.append('image', images[index]);
      formData.append('product_id', id);
      try {
        let res = await axios.post(`${BASEURL}/product-img/add`, formData, {
          // eslint-disable-next-line no-loop-func
          headers: {Authorization: 'Bearer ' + cookie.get('Bearer')},
          onUploadProgress: progressEvent => {
            let UploadPercent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            if (UploadPercent % 20 === 0) {
              refProgress.current[count.current].style.width = `${UploadPercent}%`;
              refProgress.current[count.current].setAttribute('percent', `${UploadPercent}%`);
            }
          }
        });
        ids.current[count.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function getProduct() {
    let {data, errorMessage} = await useAxios.getProduct(`${BASEURL}/${PRODUCT}/${id}`);
    if (!errorMessage) {
      setForm(data[0]);
      setImageFormServer(data[0].images);
    }
  }
  async function editProduct(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('category', form.category);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('discount', form.discount);
    formData.append('About', form.About);
    let token = cookie.get('Bearer');
    for (let index = 0; index < imageIdFromSever.length; index++) {
      try {
        await axios.delete(`${BASEURL}/product-img/${imageIdFromSever[index]}`, {headers: {Authorization: 'Bearer ' + token}});
      } catch (err) {
        console.log('error Here');
      }
    }
    setImageIdFromSever([]);
    let {errorMessage} = await useAxios.addNewProduct(`${BASEURL}/${PRODUCT}/edit/${id}`, formData);
    if (!errorMessage) nav('/dashboard/products');
  }
  async function HandleDeleteImage(index, element) {
    ids.current = ids.current.filter(id => id !== index);
    refProgress.current.splice(index, 1);
    count.current--;
    setImages(images => images.filter(img => img !== element));
    try {
       await axios.delete(`${BASEURL}/product-img/${index}`, {headers: {Authorization: 'Bearer ' + cookie.get('Bearer')}});
    } catch (err) {
      console.log('error Here');
    }
    console.log(element);
  }
  function deleteImageFromServer(id) {
    setImageIdFromSever((prev) => [...prev, id]);
    setImageFormServer(pre=>pre.filter((element)=>element.id !== id))
  }  
  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={e => editProduct(e)}>
        <label className='form-label' htmlFor='category'>
          Category
        </label>
        <select value={form.category} onChange={e => ChangeForm(e)} name='category' className='form-select text-white bg-dark border-dark mb-3' id='category'>
          {category.length > 0 &&
            category.map((element, index) => (
              <option key={index} value={element.id}>
                {element.title}
              </option>
            ))}
        </select>

        <label className='form-label' htmlFor='title'>
          Title
        </label>
        <input type='text' id='title' value={form.title} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required />

        <label className='form-label' htmlFor='description'>
          Description
        </label>
        <input type='text' id='description' value={form.description} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required />

        <label className='form-label' htmlFor='price'>
          Price
        </label>
        <input type='number' id='price' value={form.price} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required />

        <label className='form-label' htmlFor='discount'>
          Discount
        </label>
        <input type='number' id='discount'  value={form.discount} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' />

        <label className='form-label' htmlFor='About'>
          About
        </label>
        <input type='text' id='About' value={form.About} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' />

        <label className='form-label' htmlFor='images'>
          Images
        </label>
        <input type='file' ref={clickUpload} id='images' multiple hidden onChange={e => HandleChangeImage(e)} className='form-control bg-dark text-white border-dark mb-3' />
        <div
          onClick={() => {
            clickUpload.current.click();
          }}
          style={{height: '200px', border: '2px dashed', cursor: 'pointer'}}
          className='d-flex align-items-center my-3 justify-content-center'
        >
          <h2 className={`${'text-effect'}`}>Upload Image</h2>
        </div>
        <div className='d-flex gap-3 mb-4 flex-wrap '>
          {imageFormServer.map((element, index) => {
            return (
              <div key={index} className='position-relative'>
                <img width={'150px'} src={element.image} alt='ImageFormServer' />
                <button
                  onClick={() => {
                    deleteImageFromServer(element.id);
                  }}
                  style={{top: '0', right: '0'}}
                  type='button'
                  className='btn position-absolute z-2 btn-danger px-1 py-0'
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
        {images.length > 0 &&
          images.map((element, index) => {
            return (
              <div key={index} className='position-relative border p-3 rounded-3 mb-3'>
                <div className='d-flex column-gap-3 mb-3 align-items-center w-100'>
                  <img width='80px' src={URL.createObjectURL(element)} alt='img' />
                  <div className='d-flex justify-content-between w-100 align-items-start'>
                    <div>
                      <p>{element.name}</p>
                      <p>{(element.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button type='button' onClick={e => HandleDeleteImage(ids.current[index], element)} className='btn btn-danger'>
                      Delete
                    </button>
                  </div>
                </div>
                <div className='progress'>
                  <div ref={e => (refProgress.current[index] = e)} className='inner-progress progress progress-bar progress-bar-striped progress-bar-animated'></div>
                </div>
              </div>
            );
          })}
        <button className='btn btn-primary'>Done</button>
      </form>
    </div>
  );
};

export default EditProduct;
