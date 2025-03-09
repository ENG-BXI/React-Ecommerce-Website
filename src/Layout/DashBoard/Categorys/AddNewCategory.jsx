import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import {BASEURL, CATEGORY} from '../../../Api/endPoint';

const AddNewCategory = () => {
  let nav = useNavigate();
  let [title, setTitle] = useState('');
  let [images, setImages] = useState([]);

  function handleSubmit(e) {
    let form = new FormData();
    form.append('title', title);
    form.append('image', images);
    e.preventDefault();
    let {errorMessage} = useAxios.addNewCategory(`${BASEURL}/${CATEGORY}/add`, form);
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
        <input autoFocus onChange={e => setTitle(e.target.value)} value={title} className='form-control bg-dark text-white border-dark' type='text' id='name' />

        <label className='form-label' htmlFor='email'>
          Image
        </label>
        <input onChange={e => setImages(e.target.files.item(0))} className='form-control bg-dark text-white border-dark' type='file' id='email' />
        <button className='btn btn-light mt-3'>Done</button>
      </form>
    </div>
  );
};

export default AddNewCategory;
