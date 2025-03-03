import {Route, Routes} from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Home from './Pages/Home';
import Register from './Pages/Auth/register';
import {ProviderUserContext} from './Context/userContext';
import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Layout/Users/Users';
import EditUser from './Layout/EditUser';
import AddNewUser from './Layout/AddNewUser';
import Page403 from './Pages/Auth/page403';
import ProtectedRole from './Pages/Auth/ProtectedRole';
import Page404 from './Pages/Page404';
import Category from './Layout/Category';
import AddNewCategory from './Layout/AddNewCategory';

function App() {
  return (
    <>
      <ProviderUserContext>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
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
                </Route>
                <Route element={<ProtectedRole roles={['5000']} />}>
                  <Route path='writer' element={<h3>writer</h3>} />
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
