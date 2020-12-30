import React from 'react';
import { useGlobalContext } from './../context';

const CurrentQuestion = () => {
  const {
    dispatch,
    chosenQuestions,
    currentIndex,
    areButtonsDisabled,
    fiftyFiftyStatus,
    audienceStatus,
    options,
    audienceColors,
    phoneStatus,
  } = useGlobalContext();

  React.useEffect(() => {}, [fiftyFiftyStatus, audienceStatus]);

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = 'rgb(155, 49, 155);';
    e.target.style.opacity = '90%';
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = '#fc9300';
    e.target.style.color = '#111111';
    dispatch({ type: 'TOGGLE_BUTTONS', payload: true });

    setTimeout(() => {
      if (
        //substring to skip 'A: '
        e.target.innerText.substring(3) ===
        chosenQuestions[currentIndex].correct
      ) {
        e.target.style.backgroundColor = 'rgb(31, 180, 31)';
        e.target.style.color = '#000000';

        setTimeout(() => {
          e.target.style.backgroundColor = 'rgb(26, 72, 199)';
          e.target.style.color = '#ffffff';

          dispatch({ type: 'TOGGLE_BUTTONS', payload: false });
          if (fiftyFiftyStatus === 'currently using')
            dispatch({ type: 'FIFTY_FIFTY', payload: 'already used' });
          if (audienceStatus === 'currently using')
            dispatch({ type: 'ASK_THE_AUDIENCE', payload: 'already used' });
          if (phoneStatus === 'currently using')
            dispatch({ type: 'PHONE_A_FRIEND', payload: 'already used' });

          if (currentIndex < 4) {
            dispatch({ type: 'INCREASE_INDEX' });
          } else {
            dispatch({ type: 'END' });
            dispatch({ type: 'INCREASE_INDEX' });
          }
        }, 1000);
      } else {
        e.target.style.backgroundColor = 'rgb(250, 60, 60)';
        e.target.style.color = '#000000';

        setTimeout(() => {
          e.target.style.backgroundColor = 'rgb(26, 72, 199)';
          e.target.style.color = '#ffffff';

          dispatch({ type: 'TOGGLE_BUTTONS', payload: false });
          if (fiftyFiftyStatus === 'currently using')
            dispatch({ type: 'FIFTY_FIFTY', payload: 'already used' });
          if (audienceStatus === 'currently using')
            dispatch({ type: 'ASK_THE_AUDIENCE', payload: 'already used' });
          if (phoneStatus === 'currently using')
            dispatch({ type: 'PHONE_A_FRIEND', payload: 'already used' });

          dispatch({ type: 'END' });
        }, 1000);
      }
    }, 1000);
  };
  return (
    <>
      <div className='hexagon'>
        <h3 className='question'>{chosenQuestions[currentIndex].question}</h3>
        <div className='triangle-left'></div>
        <div className='triangle-right'></div>
      </div>
      <ul className='answers'>
        {chosenQuestions[currentIndex].answers.map((answer, index) => {
          return (
            <li className='single-answer' key={index}>
              <button
                type='submit'
                className='answer-button'
                disabled={areButtonsDisabled}
                onClick={handleClick}
                onMouseOver={handleMouseOver}
              >
                {fiftyFiftyStatus === 'currently using'
                  ? chosenQuestions[currentIndex].fifty_fifty.includes(answer)
                    ? options[index] + ': ' + answer
                    : ''
                  : options[index] + ': ' + answer}
              </button>
            </li>
          );
        })}
      </ul>
      {audienceStatus === 'currently using' && (
        <div className='audience-div'>
          <ul className='answer-list-percentages'>
            {chosenQuestions[currentIndex].ask_the_audience.map(
              (percentage, index) => {
                return (
                  <li
                    key={index}
                    className='single-answer-percentage'
                    style={{
                      width: percentage,
                      backgroundColor: audienceColors[index],
                    }}
                  >
                    {/* {chosenQuestions[currentIndex].answers[index]}: {option} */}
                    {options[index]}: {percentage}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
      {phoneStatus === 'currently using' && (
        <div className='phone-div'>
          <p className='phone-answer'>
            {chosenQuestions[currentIndex].phone_a_friend}
          </p>
        </div>
      )}
    </>
  );
};

export default CurrentQuestion;
