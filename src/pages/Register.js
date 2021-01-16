import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [reRoute, setReRoute] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const regexUser = RegExp('^[a-zA-Z]{3,10}$');
    const regexPass = RegExp('^[a-zA-Z0-9]{8,20}$');
    const regexConfirm = RegExp('^[a-zA-Z0-9]{8,20}$');

    if (
      regexUser.test(username) &&
      regexPass.test(password) &&
      regexConfirm.test(confirmPassword) &&
      password === confirmPassword
    ) {
      let currUsers = localStorage.getItem('users');
      let registered = [];
      if (currUsers) registered = JSON.parse(currUsers);

      let userExists = registered.filter((user) => user.username === username);

      if (!userExists.length) {
        let newUser = {
          username,
          password,
        };

        let newRegistered = [...registered, newUser];
        console.log(newRegistered);
        localStorage.setItem('users', JSON.stringify(newRegistered));
        setReRoute(true);
      } else console.log('user already exists');

      // else setAlert user already exists
    }
  };

  if (reRoute) return <Redirect to='/login'></Redirect>;
  else
    return (
      <main className='login-main'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username' className='login-username-label'>
            <span>Username:</span>
            <input
              type='text'
              name='username'
              id='username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor='password' className='login-password-label'>
            <span>Password: </span>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label
            htmlFor='confirm-password'
            className='login-confirm-password-label'
          >
            <span>Confirm Password: </span>
            <input
              type='password'
              name='confirm-password'
              id='confirm-password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <div className='login-btn-container'>
            <button type='submit' className='login-btn'>
              Register
            </button>
          </div>
        </form>
      </main>
    );
};

export default Register;
