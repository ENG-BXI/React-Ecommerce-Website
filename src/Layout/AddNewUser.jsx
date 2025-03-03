import React, {useState } from 'react'
import useAxios from '../hooks/useAxios';
import { ADDNEWUSER, BASEURL } from '../Api/endPoint';
import {  useNavigate } from 'react-router-dom';

const AddNewUser = () => {
  let nav = useNavigate();
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
    let { errorMessage } = useAxios.addNewUser(`${BASEURL}/${ADDNEWUSER}`, myForm);  
    if (!errorMessage)
      nav("/dashboard/users")
  }

  return (
    <div>
          <h2>Add New User</h2>
          <form action="" onSubmit={(e)=>{ handleSubmit(e);}}>
              <label className='form-label' htmlFor="name">User Name</label>
              <input autoFocus onChange={(e)=>changeFormValue(e)} value={myForm.name} className='form-control bg-dark text-white border-dark' type="text" id='name' />
              
              <label className='form-label' htmlFor="email">email</label>
              <input onChange={(e)=>changeFormValue(e)} value={myForm.email} className='form-control bg-dark text-white border-dark' type="email" id='email' />
              
              <label className='form-label' htmlFor="password">Password</label>
              <input onChange={(e)=>changeFormValue(e)} value={myForm.password} className='form-control bg-dark text-white border-dark' type="password" id='password' />
              
              <label className='form-label' htmlFor="role">Role</label>
              <select onChange={(e)=>changeFormValue(e)} value={myForm.role} className='form-select bg-dark text-white border-dark' id="role" >
                  <option  value="2001">user</option>
                  <option  value="1995">admin</option>
                  <option  value="1999">product manger</option>
                  <option  value="5000">writer</option>
              </select>
              <button className='btn btn-light mt-3'>Done</button>
          </form>
    </div>
  );
}

export default AddNewUser;