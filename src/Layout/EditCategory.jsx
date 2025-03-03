import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import {BASEURL, CATEGORY} from '../Api/endPoint';

const EditCategory = () => {
  let nav = useNavigate();

  let [title, setTitle] = useState('');
  let [image, setImage] = useState([]);
  let {id} = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    let form = new FormData();
    form.append('title', title);
    form.append('image', image);
    let {errorMessage} = useAxios.editCategory(`${BASEURL}/${CATEGORY}/edit/${id}`, form);
    if (!errorMessage) nav('/dashboard/category');
  }
  async function getCategoryById() {
    let {data} = await useAxios.getCategoryById(`${BASEURL}/${CATEGORY}/${id}`);
    setTitle(data.title);
    setImage(data.image);
  }
  useEffect(() => {
    getCategoryById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <input onChange={e => setImage(e.target.files.item(0))} className='form-control bg-dark text-white border-dark' type='file' id='email' />
        <button className='btn btn-light mt-3'>Done</button>
      </form>
    </div>
  );
};

export default EditCategory;
