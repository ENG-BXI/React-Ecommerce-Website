import React, {useEffect, useRef, useState} from 'react';
import useAxios from '../../../hooks/useAxios';
import {BASEURL, CATEGORIES, PRODUCT} from '../../../Api/endPoint';
import {useNavigate} from 'react-router-dom';
import './addNewProducts.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
const AddNewProducts = () => {
  let [form, setForm] = useState({
    category: 'Select Category',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: ''
  });
  let [category, setCategory] = useState([]);
  let [images, setImages] = useState([]);
  let nav = useNavigate();
  let clickUpload = useRef(null);
  let [openInput, setOpenInput] = useState(false);
  let [id, setId] = useState(null);
  let cookie = new Cookies();
  let refProgress = useRef([]);
  let ids = useRef([]);

  async function getCategory() {
    let {data, errorMessage} = await useAxios.getCategory(`${BASEURL}/${CATEGORIES}`);
    console.log(data);

    if (!errorMessage) setCategory(data);
  }
  let dummyData = {
    category: null,
    title: 'null',
    description: 'null',
    price: '0',
    discount: '0',
    About: 'null'
  };
  useEffect(() => {
    getCategory();
  }, []);
  async function ChangeForm(e) {
    setForm({...form, [e.target.id]: e.target.value});
    setOpenInput(true);
    if (!openInput) {
      let {data, errorMessage} = await useAxios.addNewProduct(`${BASEURL}/${PRODUCT}/add`, dummyData);
      if (!errorMessage) setId(data.id);
    }
  }

  let count = useRef(-1);
  async function HandleChangeImage(e) {
    let images = [...e.target.files];
    setImages(pre => [...pre, ...images]);
    console.log(images);

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
        console.log(ids.current);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function addProduct(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('category', form.category);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('discount', form.discount);
    formData.append('About', form.About);
    let {errorMessage} = await useAxios.addNewProduct(`${BASEURL}/${PRODUCT}/edit/${id}`, formData);
    if (!errorMessage) nav('/dashboard/products');
  }
  async function HandleDeleteImage(index, element) {
    ids.current = ids.current.filter(id => id !== index);
    refProgress.current.splice(index, 1);
    count.current--;
    setImages(images => images.filter(img => img !== element));
    try {
      let res = await axios.delete(`${BASEURL}/product-img/${index}`, {headers: {Authorization: 'Bearer ' + cookie.get('Bearer')}});
      console.log(res);
      console.log('delete ok');
      console.log(images);
      console.log(ids);
      console.log(refProgress);
    } catch (err) {
      console.log('error Here');
    }
    console.log(element);
  }

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={e => addProduct(e)}>
        <label className='form-label' htmlFor='category'>
          Category
        </label>
        <select value={form.category} onChange={e => ChangeForm(e)} name='category' className='form-select text-white bg-dark border-dark mb-3' id='category'>
          <option disabled value='Select Category'>
            Select Category
          </option>
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
        <input disabled={!openInput} type='text' id='title' value={form.title} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required />

        <label className='form-label' htmlFor='description'>
          Description
        </label>
        <input disabled={!openInput} type='text' id='description' value={form.description} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required />

        <label className='form-label' htmlFor='price'>
          Price
        </label>
        <input disabled={!openInput} type='number' id='price' value={form.price} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required />

        <label className='form-label' htmlFor='discount'>
          Discount
        </label>
        <input disabled={!openInput} type='number' id='discount' value={form.discount} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' />

        <label className='form-label' htmlFor='About'>
          About
        </label>
        <input disabled={!openInput} type='text' id='About' value={form.About} onChange={e => ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' />

        <label className='form-label' htmlFor='images'>
          Images
        </label>
        <input disabled={!openInput} type='file' id='images' ref={clickUpload} multiple hidden onChange={e => HandleChangeImage(e)} className='form-control bg-dark text-white border-dark mb-3' />
        <div
          onClick={() => {
            clickUpload.current.click();
          }}
          style={{height: '200px', border: '2px dashed', cursor: openInput ? 'pointer' : 'not-allowed'}}
          className='d-flex align-items-center my-3 justify-content-center'
        >
          <h2 className={`${openInput && 'text-effect'}`}>Upload Image</h2>
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

export default AddNewProducts;
