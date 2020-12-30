import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Lifelines from './Lifelines';

const Navbar = () => {
  const { isPlaying } = useGlobalContext();
  if (!isPlaying)
    return (
      <nav className='navbar'>
        <div className='nav-center'>
          <ul className='nav-links'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/options'>Options</Link>
            </li>
            <li>
              <Link to='/highscores'>Highscores</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  else return <Lifelines />;
};

export default Navbar;
