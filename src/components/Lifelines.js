import React from 'react';
import { AiFillPhone } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaPercentage } from 'react-icons/fa';
import { useGlobalContext } from '../context';

const Lifelines = () => {
  const {
    dispatch,
    fiftyFiftyStatus,
    audienceStatus,
    phoneStatus,
  } = useGlobalContext();

  const handle50_50 = (e) => {
    e.preventDefault();
    if (fiftyFiftyStatus === 'not used')
      dispatch({ type: 'FIFTY_FIFTY', payload: 'currently using' });
  };

  const handleAudience = (e) => {
    e.preventDefault();
    if (audienceStatus === 'not used') {
      dispatch({ type: 'ASK_THE_AUDIENCE', payload: 'currently using' });

      setTimeout(() => {
        dispatch({ type: 'ASK_THE_AUDIENCE', payload: 'already used' });
      }, 10000);
    }
  };

  const handlePhoneAFriend = (e) => {
    e.preventDefault();

    if (phoneStatus === 'not used') {
      dispatch({ type: 'PHONE_A_FRIEND', payload: 'currently using' });

      setTimeout(() => {
        dispatch({ type: 'PHONE_A_FRIEND', payload: 'already used' });
      }, 10000);
    }
  };

  return (
    <div className='lifeline-div'>
      <ul className='lifeline-list'>
        <li className='single-lifeline'>
          <button
            className={
              fiftyFiftyStatus !== 'not used'
                ? 'lifeline-btn-used'
                : 'lifeline-btn'
            }
            disabled={fiftyFiftyStatus !== 'not used'}
            onClick={handle50_50}
          >
            <FaPercentage className='lifeline-icon' />
          </button>
        </li>
        <li className='single-lifeline'>
          <button
            className={
              audienceStatus !== 'not used'
                ? 'lifeline-btn-used'
                : 'lifeline-btn'
            }
            disabled={audienceStatus !== 'not used'}
            onClick={handleAudience}
          >
            <BsFillPeopleFill className='lifeline-icon' />
          </button>
        </li>
        <li className='single-lifeline'>
          <button
            className={
              phoneStatus !== 'not used' ? 'lifeline-btn-used' : 'lifeline-btn'
            }
            disabled={phoneStatus !== 'not used'}
            onClick={handlePhoneAFriend}
          >
            <AiFillPhone className='lifeline-icon' />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Lifelines;
