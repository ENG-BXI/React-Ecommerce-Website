import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import {ADDNEWUSER, BASEURL} from '../Api/endPoint';

const AddNewCategory = () => {
  let nav = useNavigate();
  let [title, setTitle] = useState('');
  let [images, setImages] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    let {errorMessage} = useAxios.addNewUser(`${BASEURL}/${ADDNEWUSER}`, {
      title: title,
      image: images
    });
    if (!errorMessage) nav('/dashboard/category');
  }

  return (
    <div>
      <h2>Add New Category</h2>
      <form
        action=''
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <label className='form-label' htmlFor='name'>
          Title
        </label>
        <input autoFocus onChange={e => setTitle(e)} value={title} className='form-control bg-dark text-white border-dark' type='text' id='name' />

        <label className='form-label' htmlFor='email'>
          Image
        </label>
        <input onChange={e => setImages(e)} value={images} className='form-control bg-dark text-white border-dark' type='email' id='email' />
        <button className='btn btn-light mt-3'>Done</button>
      </form>
    </div>
  );
};

export default AddNewCategory;
