import React, { useContext, useReducer } from 'react';
import data from './data';
import reducer from './reducer';

const getLocalStorageHighscores = () => {
  let highscores = localStorage.getItem('highscores');
  // localStorage.clear();
  if (highscores) {
    return JSON.parse(highscores);
  } else {
    return [];
  }
};

const AppContext = React.createContext();

const initialMainState = {
  loading: false,
  isPlaying: false,
  radio: null,
  millionaire: data,
  currentIndex: 0,
  chosenQuestions: [],
  amounts: [0, 100, 200, 300, 500, 1000],
  areButtonsDisabled: false,
  fiftyFiftyStatus: 'not used',
  audienceStatus: 'not used',
  phoneStatus: 'not used',
  options: ['A', 'B', 'C', 'D'],
  audienceColors: ['#6996bb', '#dd6969', '#c5b358', '#69af69'],
  highscores: getLocalStorageHighscores(),
  chosenHighscores: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialMainState);

  // HOME functions
  const handleRadioChange = (e) => {
    dispatch({ type: 'SET_RADIO', payload: e.target.value });
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (state.radio) {
      dispatch({ type: 'SET_CHOSEN_QUESTIONS' });
      dispatch({ type: 'START' });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        handleRadioChange,
        handleStart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
