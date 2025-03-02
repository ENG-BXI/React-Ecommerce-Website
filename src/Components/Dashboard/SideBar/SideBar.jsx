import {useState} from 'react';
import './SideBar.css';
import {Link} from 'react-router-dom';

let SideBarItemData = [
  {icon: 'ri-home-9-line', title: 'home', path: ''},
  {icon: 'ri-group-line', title: 'users', path: 'users'},
  {
    icon: 'ri-user-add-line',
    title: 'add new user',
    path: 'add-new-user'
  }
];
export default function SideBar() {
  let [isOpen, setIsOpen] = useState(true);
  return (
    <aside style={{width: `${isOpen ? '200px' : '55px'}`}} className='side-bar '>
      <div className='fs-5 px-3 pt-4 d-flex justify-content-between  mb-4'>
        <div className={`logo d-flex align-items-baseline column-gap-1 ${isOpen ? 'block' : 'd-none'}`}>
          <i className='ri-reactjs-line'></i>
          <h3 className='mb-0 fs-5  '> Turbo</h3>
        </div>
        <i onClick={() => setIsOpen(!isOpen)} style={{cursor: 'pointer'}} className='ri-menu-line'></i>
      </div>
      {SideBarItemData.map((element, index) => {
        return <SideBarItem key={index} path={element.path} isOpen={isOpen} icon={element.icon} title={element.title} />;
      })}
    </aside>
  );
}

function SideBarItem(props) {
  return (
    <Link to={props.path} className='text-decoration-none side-bar-item text-capitalize d-flex column-gap-2 mb-1 align-items-center py-1 px-3'>
      <i className={`fs-4 ${props.icon}`}></i>
      <p className={`mb-0 fs-6 ${props.isOpen ? 'd-block' : 'd-none'}`}>{props.title}</p>
    </Link>
  );
}
