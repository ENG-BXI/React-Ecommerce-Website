import React, {useContext, useState} from 'react';
import RegisterImage from '../../assets/registerImage.svg';
import {BASEURL, LOGIN} from '../../Api/endPoint';
import useAuth from '../../hooks/useAuth';
import {useNavigate} from 'react-router-dom';
import {userContext} from '../../Context/userContext';
import Cookies from 'universal-cookie';
const Login = () => {
  let [form, setForm] = useState({
    email: '',
    password: ''
  });
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let nav = useNavigate();
  // eslint-disable-next-line no-unused-vars
  let {user, setUser} = useContext(userContext);
  let cookie = new Cookies();
  function ChangeValue(e) {
    setForm({...form, [e.target.id]: e.target.value});
  }
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    let {data, errorMessage} = await useAuth.login(`${BASEURL}/${LOGIN}`, form);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setUser(data);
      cookie.set('Bearer', data.token);
      nav('/');
    }
    setLoading(false);
  }

  function goToRegister() {
    nav('/register');
  }
  return (
    <div className='container d-flex justify-content-center align-items-center column-gap-5 w-75 my-5 p-5 shadow-lg rounded-4'>
      <div style={{flex: '1'}}>
        <img src={RegisterImage} height={'450px'} alt='RegisterImage' />
      </div>
      <div style={{flex: '2'}}>
        <h2>Login</h2>
        <p>Welcome Back!!</p>
        <form
          onSubmit={e => {
            handleLogin(e);
          }}
        >
          {/*  */}
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input className='form-control' required type='text' id='email' value={form.email} onChange={e => ChangeValue(e)} />
          {/*  */}
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <input className='form-control' type='password' required minLength={6} id='password' value={form.password} onChange={e => ChangeValue(e)} />
          {/*  */}
          {error !== '' && <p className='bg-danger-subtle p-2 mt-2 mb-0 rounded-3 text-danger'>{error}</p>}
          <p className='text-end mx-2 my-1 text-primary' onClick={goToRegister} style={{cursor: 'pointer'}}>
            Register Now
          </p>
          <button className='btn w-100 btn-primary mt-2'>{loading ? <span className='loading-button'></span> : 'Login'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
