import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Lifelines from './Lifelines';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { BsTrophy } from 'react-icons/bs';
import useToken from './useToken';

const Navbar = () => {
  const { isPlaying } = useGlobalContext();
  const { token, removeToken } = useToken();

  function handleSubmit(e) {
    e.preventDefault();
    removeToken();
  }

  if (!isPlaying)
    return (
      <nav className='navbar'>
        <div className='nav-center'>
          <ul className='nav-links'>
            <li>
              <Link to='/'>
                <FaHome />
              </Link>
            </li>
            <li>
              <Link to='/options'>
                <MdSettings />
              </Link>
            </li>
            <li>
              <Link to='/highscores'>
                <BsTrophy />
              </Link>
            </li>
            <li>
              {!token ? (
                <Link to='/login'>
                  <FaSignInAlt />
                </Link>
              ) : (
                <form onSubmit={handleSubmit}>
                  <button type='submit'>
                    <FaSignOutAlt className='navbar-logout-icon' />
                  </button>
                </form>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  else return <Lifelines />;
};

export default Navbar;
