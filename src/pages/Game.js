import React from 'react';
import { useGlobalContext } from './../context';
import { Redirect } from 'react-router-dom';
import CurrentQuestion from '../components/CurrentQuestion';

import Loading from '../components/Loading';

const Game = () => {
  const { millionaire, currentIndex, dispatch } = useGlobalContext();

  React.useEffect(() => {
    //setAmounts([0, 100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000]);

    dispatch({ type: 'SET_CHOSEN_QUESTIONS' });
  }, [millionaire, dispatch]);
  const { isPlaying } = useGlobalContext();

  if (currentIndex >= 5) return <Loading />;
  else if (isPlaying)
    return (
      <div className='game-div'>
        <form className='question-form'>
          <CurrentQuestion />
        </form>
      </div>
    );
  else return <Redirect to='/endscreen' />;
};

export default Game;
