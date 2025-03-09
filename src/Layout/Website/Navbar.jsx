import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function NavbarWebsite() {
  let cookie = new Cookies();
  let token = cookie.get('Bearer');
  let nav = useNavigate();
  return (
    <nav className=' m-4 d-flex align-items-center justify-content-between'>
      {/* logo */}
      <div className='d-flex align-items-center column-gap-1'>
        <i className='fs-3 ri-store-2-line'></i>
        <h3 className='mb-0'>Smart Shop</h3>
      </div>
      {/* Search */}
      <div className='d-flex w-50'>
        <input type='search' className='form-control' />
        <button type='button' style={{backgroundColor: 'var(--main-color)', color: 'white'}} className='btn btn-sm'>
          Search
        </button>
      </div>
      {/* card and Profile */}
      <div className='d-flex column-gap-2 align-items-center'>
        <i className=' fs-3 ri-shopping-cart-2-line'></i>
        {}
        {token ? (
          <i style={{backgroundColor: 'var(--main-color)', lineHeight: 'calc(1.3rem + 0.6vw)'}} className='fs-3 p-2 text-white rounded-circle ri-user-3-line'></i>
        ) : (
          <>
            <button onClick={() => nav('/login')} className='btn btn-primary'>
              Login
            </button>
            <button onClick={() => nav('/register')} className='btn btn-primary'>
              Sign in
            </button>
          </>
        )}
      </div>
    </nav>
  );
}