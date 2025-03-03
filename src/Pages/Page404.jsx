import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    let nav = useNavigate();
    
  return (
    <div className='vh-100 d-flex flex-column align-items-center'>
      <h3 className='text-center fs-1 pt-5 text-capitalize'>Page not Found 404</h3>
      <button onClick={()=>{nav("/")}} className='btn btn-primary mt-2'>Go Home</button>
    </div>
  );
};

export default Page404;
