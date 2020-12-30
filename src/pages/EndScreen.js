import React from 'react';
import { useGlobalContext } from './../context';
import { Link } from 'react-router-dom';

const EndScreen = () => {
  const { currentIndex, amounts } = useGlobalContext();
  return (
    <div className='end-div'>
      <h2 className='amount-won'>Osvojen iznos: {amounts[currentIndex]}kn</h2>

      <div className='end-btn-container'>
        <Link className='end-screen-btn' to='/'>
          Back Home
        </Link>
        {amounts[currentIndex] > 0 && (
          <Link className='end-screen-btn' to='/new_highscore'>
            Add to Highscores
          </Link>
        )}
      </div>
    </div>
  );
};

export default EndScreen;
