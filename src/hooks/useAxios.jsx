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
  getCategory: async path => {
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
      console.log('From getCategory ===>', err);
    } finally {
      return {data, errorMessage};
    }
  },
  getProducts: async path => {
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
      console.log('From getProducts ===>', err);
    } finally {
      return {data, errorMessage};
    }
  },
  getCategoryById: async path => {
    let response, data, errorMessage;
    try {
      response = await axios.get(path, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        }
      });
      data = response.data;
    } catch (err) {
      console.log('Form GetCategoryById ====>', err);
      errorMessage = err.data;
    } finally {
      return {
        data,
        errorMessage
      };
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
      console.log('from add New User ======> ', err);
      errorMessage = err.data;
    } finally {
      return {errorMessage};
    }
  },
  addProductImages: async (path, form) => {
    let errorMessage;
    try {
      await axios.post(path, form, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer'),
        }
      });
    } catch (err) {
      console.log('from add New Image ======> ', err);
      errorMessage = err.data;
    } finally {
      return {errorMessage};
    }
  },
  addNewCategory: async (path, form) => {
    let errorMessage;
    try {
      await axios.post(path, form, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        }
      });
    } catch (err) {
      console.log('from add New Category ======> ', err);
      errorMessage = err.data;
    } finally {
      return {errorMessage};
    }
  },
  addNewProduct: async (path, form) => {
    let response, errorMessage, data;
    try {
      response = await axios.post(path, form, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        },
        onUploadProgress: progressEvent => {
          console.log(progressEvent);
        }
      });
      data = response.data;
    } catch (err) {
      console.log('from addNewProduct ======> ', err);
      errorMessage = err.data;
    } finally {
      return {data, errorMessage};
    }
  },
  editCategory: async (path, form) => {
    let errorMessage;
    try {
      await axios.post(path, form, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        }
      });
    } catch (err) {
      console.log('from edit Category ======> ', err);
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
  deleteCategory: async path => {
    let errorMessage;
    try {
      await axios.delete(path, {
        headers: {
          Authorization: 'Bearer ' + cookie.get('Bearer')
        }
      });
    } catch (err) {
      console.log('from deleteCategory ======>', err);
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
