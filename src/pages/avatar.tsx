import axios from 'axios';
import Cookies from 'js-cookie';

export const getAvatar =  (token: any) => {
    
  const headers = { Authorization: `Bearer ${token}` };
  const res =  axios.get('http://localhost:9000/users/my-avatar', { headers, responseType: 'blob' });
  const blob = new Blob([res.data], { type: 'image/png' });
  return URL.createObjectURL(blob);
};