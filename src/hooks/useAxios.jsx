import axios from 'axios';
import Cookies from 'universal-cookie';
let cookie = new Cookies();
let token = cookie.get("Bearer");
let useAxios = {
  getUser: async path => {
    let response;
    let data;
    let errorMessage;
    try {
      response = await axios.get(path, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      data = response.data;
    } catch (err) {
      errorMessage = err.response;
      console.log('Error form GetUsers =========', err);
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
          Authorization: 'Bearer ' + token
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
          Authorization: 'Bearer ' + token
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
          Authorization: 'Bearer ' + token
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
    let response;
    let errorMessage;
    try {
      response = await axios.delete(path, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (err) {
      console.log('from deleteUser ======>', err);
      errorMessage = err.data;
    } finally {
      return {errorMessage};
    }
  }
};

export default useAxios;