import React, {useContext, useEffect, useState} from 'react';
import RegisterImage from '../../assets/registerImage.svg';
import {BASEURL, REGISTER} from '../../Api/endPoint';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {userContext} from '../../Context/userContext';
import Cookies from 'universal-cookie';
const Register = () => {
  // useState
  let [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  let [passwordR, setPasswordR] = useState('');
  let [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Navigate
  let nav = useNavigate();
  // Context
  // eslint-disable-next-line no-unused-vars
  let {user, setUser} = useContext(userContext);
  // Cookie
  let cookie = new Cookies();

  function ChangeValue(e) {
    setForm({...form, [e.target.id]: e.target.value});
  }
  async function handleRegister(e) {
    e.preventDefault();
    if (form.password !== passwordR) {
      setError("Password don't match");
      return;
    }
    setLoading(true);
    let {data, errorMessage} = await useAuth.register(`${BASEURL}/${REGISTER}`, form);

    if (errorMessage) {
      setError(errorMessage);
    } else {
      if (cookie.get('Bearer')) cookie.remove('Bearer');
      cookie.set('Bearer', data.token);
      setUser(data);
      let go = data.user.role === '1991' || data.user.role === '5000' ? '/dashboard' : '/';
      nav(go);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (cookie.get('Bearer')) {
      let go = user.role === '1991' || user.role === '5000' ? '/dashboard' : '/';
      nav(go);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='container d-flex justify-content-center align-items-start column-gap-5 w-75 my-5 p-5 shadow-lg rounded-4'>
      <div style={{flex: '1'}}>
        <img src={RegisterImage} height={'470px'} alt='RegisterImage' />
      </div>
      <div style={{flex: '2'}} className='py-4'>
        <h2>Sign up</h2>
        <p>Let’s get you all st up so you can access your personal account.</p>
        <form onSubmit={e => handleRegister(e)}>
          <label className='form-label' htmlFor='name'>
            Name
          </label>
          <input className='form-control' type='text' id='name' required value={form.name} onChange={e => ChangeValue(e)} />
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input className='form-control' type='email' id='email' required value={form.email} onChange={e => ChangeValue(e)} />
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <input className='form-control' type='password' id='password' required minLength={6} value={form.password} onChange={e => ChangeValue(e)} />
          <label className='form-label' htmlFor='passwordR'>
            Confirm Password
          </label>
          <input className='form-control' type='password' id='passwordR' required minLength={6} value={passwordR} onChange={e => setPasswordR(e.target.value)} />
          {error !== '' && <p className='bg-danger-subtle p-2 mt-2 mb-0 rounded-3 text-danger'>{error}</p>}
          <p className='text-end mx-2 my-1 text-primary' onClick={() => nav('/login')} style={{cursor: 'pointer'}}>
            Login
          </p>
          <button className='btn w-100 btn-primary mt-2'>{loading ? <span className='loading-button'></span> : 'Register'}</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
