import axios from 'axios';
import Cookies from 'universal-cookie';
let cookie = new Cookies();

let useAxios = {
  getUser: async path => {
    let response;
    let data;
    let errorMessage;
    try {
      response = await axios.get(path, {
        headers: {
          Authorization: `Bearer ${cookie.get('Bearer')}`
        }
      });
      data = response.data;
    } catch (err) {
      errorMessage = err.response;
      console.log('Error form GetUser =========', err);
    } finally {
      return {data, errorMessage};
    }
  },
  getUsers: async path => {
    let response;
    let data;
    let errorMessage;
    try {
      response = await axios.get(path, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        }
      });
      data = response.data;
    } catch (err) {
      errorMessage = err;
      console.log(err);
    } finally {
      return {data, errorMessage};
    }
  },
  editUser: async (path, form) => {
    let errorMessage;
    try {
      await axios.post(path, form, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        }
      });
    } catch (err) {
      console.log('from editUser ======> ', err);
      errorMessage = err.data;
    } finally {
      return {errorMessage};
    }
  },
  addNewUser: async (path, form) => {
    let errorMessage;
    try {
      await axios.post(path, form, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        }
      });
    } catch (err) {
      console.log('from editUser ======> ', err);
      errorMessage = err.data;
    } finally {
      return {errorMessage};
    }
  },
  deleteUser: async path => {
    let errorMessage;
    try {
      await axios.delete(path, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        }
      });
    } catch (err) {
      console.log('from deleteUser ======>', err);
      errorMessage = err.data;
    } finally {
      return {errorMessage};
    }
  },
  logOut: async path => {
    let errorMessage;
    try {
      await axios.get(path, {
        headers: {
          Authorization: `Bearer ${cookie.get('Bearer')}`
        }
      });
      cookie.remove('Bearer');
    } catch (err) {
      console.log('From LogOut ====> ', err);
      errorMessage = err;
    } finally {
      return {errorMessage};
    }
  }
};

export default useAxios;
