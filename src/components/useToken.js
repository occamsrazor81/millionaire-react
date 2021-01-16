import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const userToken = JSON.parse(localStorage.getItem('token'));
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    removeToken,
    setToken: saveToken,
    token,
  };
}
