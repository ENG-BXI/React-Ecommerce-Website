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

function App() {
  return (
    <>
      <ProviderUserContext>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='users' element={<Users />} />
              <Route path='edit-user/:id' element={<EditUser />} />
              <Route path='add-new-user' element={<AddNewUser />} />
            </Route>
          </Route>
        </Routes>
      </ProviderUserContext>
    </>
  );
}

export default App;
