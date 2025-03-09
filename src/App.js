import {Route, Routes} from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/register';
import {ProviderUserContext} from './Context/userContext';
import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Layout/DashBoard/Users/Users';
import AddNewUser from './Layout/DashBoard/Users/AddNewUser';
import ProtectedRole from './Pages/Auth/ProtectedRole';
import Page404 from './Pages/Page404';
import Category from './Layout/DashBoard/Categorys/Category';
import AddNewCategory from './Layout/DashBoard/Categorys/AddNewCategory';
import EditCategory from './Layout/DashBoard/Categorys/EditCategory';
import Page403 from './Pages/page403';
import AddNewProducts from './Layout/DashBoard/Products/AddNewProducts';
import Website from './Pages/Website/Website';
import Home from './Layout/Website/Home';
import EditUser from './Layout/DashBoard/Users/EditUser';
import EditProduct from './Layout/DashBoard/Products/EditProduct';
import Products from './Layout/DashBoard/Products/Products';

function App() {
  return (
    <>
      <ProviderUserContext>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Website />} >
            <Route path="/" element={<Home/>} />  
          </Route>
          <Route path='/*' element={<Page404 />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedRole roles={['5000']} />}>
              <Route path='/dashboard' element={<Dashboard />}>
                <Route element={<ProtectedRole roles={[]} />}>
                  <Route path='users' element={<Users />} />
                  <Route path='edit-user/:id' element={<EditUser />} />
                  <Route path='add-new-user' element={<AddNewUser />} />
                  <Route path='category' element={<Category />} />
                  <Route path='add-new-category' element={<AddNewCategory />} />
                  <Route path='edit-category/:id' element={<EditCategory />} />
                  <Route path='products' element={<Products />} />
                  <Route path='add-new-product' element={<AddNewProducts />} />
                  <Route path='edit-product/:id' element={<EditProduct />} />
                </Route>
                <Route path='page403' element={<Page403 />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ProviderUserContext>
    </>
  );
}

export default App;
