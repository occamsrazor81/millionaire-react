import React from 'react';
// import PropTypes from 'prop-types';

import { useState } from 'react';

import { FaUser, FaLock, FaUnlock, FaUserPlus } from 'react-icons/fa';
import useToken from '../components/useToken';
import { Link, Redirect } from 'react-router-dom';

async function loginUser(credentials) {
  return await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'appliction/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

/// TO DO:
// print alerts on screen depending
// on what went wrong during login or registration
// (e.g wrong password in login)

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { token, setToken } = useToken();

  const handleSubmit = async (e) => {
    //e.preventDefault();

    var regexUser = RegExp('^([a-zA-Z]{3,10})$');
    const regexPass = RegExp('^([a-zA-Z0-9]{8,20})$');

    if (regexUser.test(username) && regexPass.test(password)) {
      let currUsers = localStorage.getItem('users');
      let registered = [];
      if (currUsers) registered = JSON.parse(currUsers);

      let wantedUser = registered.filter((user) => user.username === username);

      if (!wantedUser.length) {
        console.log("User doesn't exist.");
      } else if (wantedUser[0].password !== password) {
        console.log('Incorrect password.');
      } else {
        const receivedToken = await loginUser({
          username,
          password,
        });
        setToken(receivedToken);
      }
    }
  };

  if (token) {
    return <Redirect to='/'></Redirect>;
  } else
    return (
      <main className='login-main'>
        <div className='registration-div'>
          <Link to='/register'>
            <FaUserPlus className='registration-icon' /> Register
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username' className='login-username-label'>
            <span>
              <FaUser />
            </span>
            <input
              type='text'
              name='username'
              id='username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor='password' className='login-password-label'>
            <span>
              <FaLock />{' '}
            </span>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className='login-btn-container'>
            <button type='submit' className='login-btn'>
              <FaUnlock className='icon-unlock' />
              Login
            </button>
          </div>
        </form>
      </main>
    );
};

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

export default Login;
