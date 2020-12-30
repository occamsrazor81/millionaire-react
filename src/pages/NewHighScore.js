import React from 'react';
import { useGlobalContext } from './../context';
import { Redirect } from 'react-router-dom';

const NewHighScore = () => {
  const [username, setUsername] = React.useState('');

  const { dispatch, currentIndex, amounts, radio } = useGlobalContext();

  const handleClick = (e) => {
    e.preventDefault();
    if (amounts[currentIndex] > 0)
      dispatch({
        type: 'NEW_HIGHSCORE',
        payload: { username: username, score: amounts[currentIndex] },
      });
    setUsername('');
  };

  if (radio)
    return (
      <main className='new-highscore-main'>
        <form className='highscore-form'>
          <label htmlFor='username' className='label-username'>
            Enter username:
            <input
              type='text'
              name='username'
              id='username'
              className='input-username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <button className='new-highscore-btn' onClick={handleClick}>
            Apply
          </button>
        </form>
      </main>
    );
  else return <Redirect to='/highscores'></Redirect>;
};

export default NewHighScore;
