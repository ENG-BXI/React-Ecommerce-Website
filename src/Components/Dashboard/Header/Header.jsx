import {useContext, useState} from 'react';
import {BASEURL, LOGOUT} from '../../../Api/endPoint';
import {useNavigate} from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import {userContext} from '../../../Context/userContext';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  let nav = useNavigate();
  let {user} = useContext(userContext);
  async function handleLogOut() {
    try {
      let {errorMessage} = await useAxios.logOut(`${BASEURL}/${LOGOUT}`);
      if (!errorMessage) nav('/login', {replace: true});
    } catch (err) {
      console.log(err);
    }
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header style={{height: '50px'}} className='mt-4 d-flex justify-content-end'>
      <div className='dropdown mx-5'>
        <button className='btn btn-secondary dropdown-toggle' type='button' onClick={toggleDropdown} aria-expanded={isOpen}>
          {user.name}
        </button>
        <div style={{minWidth: '30px'}} className={`dropdown-menu bg-dark  ${isOpen ? 'show' : ''}`}>
          <button className='dropdown-item  text-white bg-dark' onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
