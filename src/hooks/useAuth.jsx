import axios from 'axios';

const useAuth = {
  register: async (path, {name, email, password}) => {
    let response;
    let data;
    let errorMessage;
    try {
      response = await  axios.post(path, {name: name, email: email, password: password});
      data = response.data;
    } catch (err) {
      errorMessage = err.response.data.message;
      console.log(err);
    } finally {
      return {data, errorMessage};
    }
  },
  login: async (path, {email, password}) => {
    let response;
    let data;
    let errorMessage;
    try {
      response = await axios.post(path, {email: email, password: password});
      data = response.data;
    } catch (err) {
      if (err.response.status === 401) errorMessage = 'Email or Password is Wrong';
      console.log(err);
    } finally {
      return {data, errorMessage};
    }
  }
};
export default useAuth;
