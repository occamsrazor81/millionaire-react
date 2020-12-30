import React from 'react';
import { useGlobalContext } from '../context';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const {
    isPlaying,
    handleRadioChange,
    handleStart,
    dispatch,
  } = useGlobalContext();

  React.useEffect(() => {
    dispatch({ type: 'SET_RADIO', payload: null });
  }, [dispatch]);

  if (!isPlaying) {
    return (
      <div className='radio container'>
        <form onSubmit={handleStart}>
          <input
            type='radio'
            name='difficulty'
            value='easy'
            id='easy'
            onChange={handleRadioChange}
          />
          <label htmlFor='easy' className='difficulty-lvl'>
            Easy
          </label>

          <input
            type='radio'
            name='difficulty'
            value='medium'
            id='medium'
            onChange={handleRadioChange}
          />
          <label htmlFor='medium' className='difficulty-lvl'>
            Medium
          </label>

          <input
            type='radio'
            name='difficulty'
            value='hard'
            id='hard'
            onChange={handleRadioChange}
          />
          <label htmlFor='hard' className='difficulty-lvl'>
            Hard
          </label>

          <input
            type='radio'
            name='difficulty'
            value='increasing'
            id='increasing'
            onChange={handleRadioChange}
          />
          <label htmlFor='increasing' className='difficulty-lvl'>
            Increasing
          </label>

          <button type='submit' className='start-btn'>
            Start
          </button>
        </form>
      </div>
    );
  } else {
    return <Redirect to='/game' />;
  }
};

export default Home;
