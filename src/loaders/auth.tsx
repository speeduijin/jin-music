import axios from 'axios';

export const isNotLoggedIn = async () => {
  try {
    const response = await axios.get('/auth/isnotloggedin');
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status && status < 500) {
        const message: string = error.response?.data.message;
        return message;
      } else {
        throw new Response();
      }
    }
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await axios.get('/auth/isloggedin');
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status && status < 500) {
        const message: string = error.response?.data.message;
        return message;
      } else {
        throw new Response();
      }
    }
  }
};
