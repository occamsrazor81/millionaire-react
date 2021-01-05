import React from 'react';
import { useGlobalContext } from '../context';
import { AiOutlineSave } from 'react-icons/ai';
import { Redirect } from 'react-router-dom';

const AddNewQuestion = () => {
  const {
    newQuestionDispatch,
    newQuestionState,
    dispatch,
  } = useGlobalContext();

  const [reRoute, setReRoute] = React.useState(false);

  function handleCategoryChange(e) {
    newQuestionDispatch({ type: 'CATEGORY_CHANGE', payload: e.target.value });
  }

  function handleDifficultyChange(e) {
    newQuestionDispatch({ type: 'DIFFICULTY_CHANGE', payload: e.target.value });
  }

  function handleQuestionChange(e) {
    newQuestionDispatch({ type: 'QUESTION_CHANGE', payload: e.target.value });
  }

  function handleAnswerChange(e) {
    let index = e.target.name;
    index = parseInt(index.substring(index.length - 1, index.length));
    newQuestionDispatch({
      type: 'ANSWER_CHANGE',
      payload: { index: index, value: e.target.value },
    });
    if (index === newQuestionState.correctIndex)
      newQuestionDispatch({ type: 'CORRECT_CHANGE', payload: index });
  }

  function handleCorrectChange(e) {
    const index = parseInt(e.target.value);
    newQuestionDispatch({ type: 'CORRECT_CHANGE', payload: index });
  }

  function handlePercentChange(e) {
    let index = e.target.name;
    index = parseInt(index.substring(index.length - 1, index.length));
    newQuestionDispatch({
      type: 'PERCENT_CHANGE',
      payload: { index: index, percent: e.target.value },
    });
  }

  function handlePhoneAFriendChange(e) {
    newQuestionDispatch({ type: 'PHONE_CHANGE', payload: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    newQuestionDispatch({ type: 'SUBMIT' });
  };

  React.useEffect(() => {
    newQuestionDispatch({ type: 'DEFLAG' });
  }, [newQuestionDispatch]);

  React.useEffect(() => {
    if (newQuestionState.flag) {
      dispatch({ type: 'ADD_NEW_QUESTION', payload: newQuestionState });
      newQuestionDispatch({ type: 'DEFLAG' });
      setReRoute(true);
    }
  }, [newQuestionState, newQuestionDispatch, dispatch]);

  if (!reRoute)
    return (
      <main className='new-question-main'>
        <form className='new-question-form' onSubmit={handleSubmit}>
          <div className='category-div'>
            <label htmlFor='select-category'>
              <select
                name='select-category'
                className='select-category'
                value={newQuestionState.category}
                onChange={handleCategoryChange}
              >
                <option value='common knowledge'>common knowledge</option>
                <option value='cinema'>cinema</option>
                <option value='sport'>sport</option>
                <option value='science'>science</option>
                <option value='music'>music</option>
                <option value='history'>history</option>
                <option value='geography'>geography</option>
                <option value='art'>art</option>
              </select>
            </label>
          </div>
          <div className='difficulty-div'>
            <label htmlFor='select-difficulty'>
              <select
                name='select-difficulty'
                className='select-difficulty'
                value={newQuestionState.difficulty}
                onChange={handleDifficultyChange}
              >
                <option value='easy'>easy</option>
                <option value='medium'>medium</option>
                <option value='hard'>hard</option>
              </select>
            </label>
          </div>
          <div className='question-text-div'>
            <label htmlFor='question-area'>
              <textarea
                name='question-area'
                cols='48'
                rows='8'
                placeholder='enter question text...'
                value={newQuestionState.question}
                onChange={handleQuestionChange}
              ></textarea>
            </label>
          </div>

          <div className='big-answers-div'>
            <div className='answers-div'>
              <label htmlFor='answer-0'>
                <span> A:</span>
                <input
                  type='text'
                  name='answer-0'
                  className='question-answer'
                  value={newQuestionState.answers[0]}
                  onChange={handleAnswerChange}
                />
              </label>
              <br />
              <label htmlFor='answer-1'>
                <span> B:</span>
                <input
                  type='text'
                  name='answer-1'
                  className='question-answer'
                  value={newQuestionState.answers[1]}
                  onChange={handleAnswerChange}
                />
              </label>
              <br />
              <label htmlFor='answer-2'>
                <span> C:</span>
                <input
                  type='text'
                  name='answer-2'
                  className='question-answer'
                  value={newQuestionState.answers[2]}
                  onChange={handleAnswerChange}
                />
              </label>
              <br />
              <label htmlFor='answer-3'>
                <span> D:</span>
                <input
                  type='text'
                  name='answer-3'
                  className='question-answer'
                  value={newQuestionState.answers[3]}
                  onChange={handleAnswerChange}
                />
              </label>
            </div>
            <div className='correct-answer-div'>
              Correct answer:
              <label>
                <input
                  type='radio'
                  name='proposed-answer'
                  value='0'
                  checked={newQuestionState.correctIndex === 0}
                  onChange={handleCorrectChange}
                />
                <span>A</span>
              </label>
              <label>
                <input
                  type='radio'
                  name='proposed-answer'
                  value='1'
                  checked={newQuestionState.correctIndex === 1}
                  onChange={handleCorrectChange}
                />
                <span>B</span>
              </label>
              <label>
                <input
                  type='radio'
                  name='proposed-answer'
                  value='2'
                  checked={newQuestionState.correctIndex === 2}
                  onChange={handleCorrectChange}
                />
                <span>C</span>
              </label>
              <label>
                <input
                  type='radio'
                  name='proposed-answer'
                  value='3'
                  checked={newQuestionState.correctIndex === 3}
                  onChange={handleCorrectChange}
                />
                <span>D</span>
              </label>
            </div>
          </div>

          <div className='big-lifelines-div'>
            <div className='ask-the-audience-div'>
              Audience answers:
              <label htmlFor='percent-0'>
                A:
                <input
                  type='number'
                  name='percent-0'
                  className='question-answer-percent'
                  min='0'
                  max='100'
                  value={newQuestionState.ask_the_audience[0]}
                  onChange={handlePercentChange}
                />
              </label>
              <label htmlFor='percent-1'>
                B:
                <input
                  type='number'
                  name='percent-1'
                  className='question-answer-percent'
                  min='0'
                  max='100'
                  value={newQuestionState.ask_the_audience[1]}
                  onChange={handlePercentChange}
                />
                <label htmlFor='percent-2'>
                  C:
                  <input
                    type='number'
                    name='percent-2'
                    className='question-answer-percent'
                    min='0'
                    max='100'
                    value={newQuestionState.ask_the_audience[2]}
                    onChange={handlePercentChange}
                  />
                </label>
                <label htmlFor='percent-3'>
                  D:
                  <input
                    type='number'
                    name='percent-3'
                    className='question-answer-percent'
                    min='0'
                    max='100'
                    value={newQuestionState.ask_the_audience[3]}
                    onChange={handlePercentChange}
                  />
                </label>
              </label>
            </div>
            <div className='phone-a-friend-div'>
              <textarea
                name='phone-a-friend-area'
                cols='40'
                rows='8'
                placeholder='friend answer here...'
                value={newQuestionState.phone_a_friend}
                onChange={handlePhoneAFriendChange}
              ></textarea>
            </div>
          </div>
          <div className='submit-btn-container'>
            <button type='submit'>
              <AiOutlineSave className='save-icon' />
            </button>
          </div>
        </form>
      </main>
    );
  else return <Redirect to='/question_list' />;
};

export default AddNewQuestion;
