import React, { useEffect, useState } from 'react'
import useAxios from '../../../hooks/useAxios';
import {BASEURL, EDITUSER, USER} from '../../../Api/endPoint';
import {  useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  let nav = useNavigate();
  let {id} = useParams();
  
   let [myForm, setForm] = useState({
     name: '',
     email: '',
     password: '',
     role: ''
   });
  function changeFormValue(e) {
    console.log("change");
    console.log(myForm);
    setForm({...myForm,[e.target.id]:e.target.value})
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    let { errorMessage } = useAxios.editUser(`${BASEURL}/${EDITUSER}/${id}`, myForm);  
    if (!errorMessage)
      nav("/dashboard/users")
  }

 async function getUser() {
   let { data, errorMessage } = await useAxios.getUser(`${BASEURL}/${USER}/${id}`);
   if(!errorMessage)
   setForm({...myForm,
     name: data.name,
     email: data.email,
     role: data.role
   })
   else {
     nav("/page404")
   }
  }
  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      <h2>Edit User</h2>
      <form
        action=''
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <label className='form-label' htmlFor='name'>
          User Name
        </label>
        <input autoFocus onChange={e => changeFormValue(e)} value={myForm.name} className='form-control bg-dark text-white border-dark' type='text' id='name' />

        <label className='form-label' htmlFor='email'>
          email
        </label>
        <input onChange={e => changeFormValue(e)} value={myForm.email} className='form-control bg-dark text-white border-dark' type='email' id='email' />

        <label className='form-label' htmlFor='password'>
          Password
        </label>
        <input onChange={e => changeFormValue(e)} value={myForm.password} className='form-control bg-dark text-white border-dark' type='password' id='password' />

        <label className='form-label' htmlFor='role'>
          Role
        </label>
        <select onChange={e => changeFormValue(e)} value={myForm.role} className='form-select bg-dark text-white border-dark' id='role'>
          <option value='2001'>user</option>
          <option value='1995'>admin</option>
          <option value='1999'>product manger</option>
          <option value='5000'>writer</option>
        </select>
        <button className='btn btn-light mt-3'>Done</button>
      </form>
    </div>
  );
}

export default EditUser;