const reducer = (state, action) => {
  if (action.type === 'SET_CHOSEN_QUESTIONS') {
    let indices = [];
    let newQuestions = [];
    const questionDifficulties = [];
    if (state.radio === 'increasing')
      questionDifficulties.push.apply(questionDifficulties, [
        'easy',
        'easy',
        'medium',
        'medium',
        'hard',
      ]);
    else
      questionDifficulties.push.apply(questionDifficulties, [
        state.radio,
        state.radio,
        state.radio,
        state.radio,
        state.radio,
      ]);

    let diffIndex = 0;
    for (let i = 0; i < 5; ++i) {
      let idx = Math.floor(Math.random() * state.millionaire.length);

      while (
        indices.includes(idx) ||
        state.millionaire[idx].difficulty !== questionDifficulties[diffIndex]
      )
        idx = Math.floor(Math.random() * state.millionaire.length);

      indices.push(idx);
      newQuestions.push(state.millionaire[idx]);
      diffIndex++;
    }

    return {
      ...state,
      chosenQuestions: newQuestions,
      currentIndex: 0,
      loading: false,
      amounts: [0, 100, 200, 300, 500, 1000],
      areButtonsDisabled: false,
    };
  } else if (action.type === 'SET_RADIO') {
    return { ...state, radio: action.payload };
  } else if (action.type === 'START') {
    return { ...state, isPlaying: true };
  } else if (action.type === 'END') {
    return {
      ...state,
      isPlaying: false,
      fiftyFiftyStatus: 'not used',
      audienceStatus: 'not used',
      phoneStatus: 'not used',
    };
  } else if (action.type === 'TOGGLE_BUTTONS') {
    return { ...state, areButtonsDisabled: action.payload };
  } else if (action.type === 'INCREASE_INDEX') {
    return { ...state, currentIndex: state.currentIndex + 1 };
  } else if (action.type === 'FIFTY_FIFTY') {
    return { ...state, fiftyFiftyStatus: action.payload };
  } else if (action.type === 'ASK_THE_AUDIENCE') {
    return { ...state, audienceStatus: action.payload };
  } else if (action.type === 'PHONE_A_FRIEND') {
    return { ...state, phoneStatus: action.payload };
  } else if (action.type === 'NEW_HIGHSCORE') {
    let newHighscores = state.highscores;
    newHighscores.push({
      username: action.payload.username,
      score: action.payload.score,
      difficulty: state.radio,
    });

    newHighscores.sort((first, second) => second.score - first.score);

    localStorage.setItem('highscores', JSON.stringify(newHighscores));

    return {
      ...state,
      highscores: newHighscores,
      currentIndex: 0,
      radio: null,
    };
  } else if (action.type === 'DIFFICULTY_HIGHSCORE') {
    let diff = action.payload;
    let chosenHS = state.highscores.filter((hs) => hs.difficulty === diff);
    return {
      ...state,
      chosenHighscores: chosenHS,
    };
  } else if (action.type === 'ADD_NEW_QUESTION') {
    const {
      category,
      difficulty,
      question,
      answers,
      correct,
      fifty_fifty,
      ask_the_audience,
      phone_a_friend,
    } = action.payload;

    let new_audience = ask_the_audience.map((ask) => ask + '%');

    let idArr = state.millionaire.map((singleMill) => singleMill.id);
    let newId = Math.max(...idArr) + 1;

    let newMillionaireItem = {
      id: newId,
      category,
      difficulty,
      question,
      answers,
      correct,
      fifty_fifty,
      ask_the_audience: new_audience,
      phone_a_friend,
    };

    let newMillionaire = [...state.millionaire, newMillionaireItem];
    // newMillionaire.push(newMillionaireItem);

    localStorage.setItem('millionaire', JSON.stringify(newMillionaire));

    return { ...state, millionaire: newMillionaire };
  } else if (action.type === 'SAVE_EDITED_QUESTION') {
    const {
      category,
      difficulty,
      question,
      answers,
      correct,
      fifty_fifty,
      ask_the_audience,
      phone_a_friend,
    } = action.payload.vars;

    const id = action.payload.id;

    let new_audience = ask_the_audience.map((ask) => ask + '%');

    // let idArr = state.millionaire.map((singleMill) => singleMill.id);
    // let newId = Math.max(...idArr) + 1;

    let editedMillionaireItem = {
      id: parseInt(id),
      category,
      difficulty,
      question,
      answers,
      correct,
      fifty_fifty,
      ask_the_audience: new_audience,
      phone_a_friend,
    };

    let newMillionaire = state.millionaire;
    newMillionaire = newMillionaire.map((singleMill) => {
      if (singleMill.id === editedMillionaireItem.id) {
        return editedMillionaireItem;
      } else {
        return singleMill;
      }
    });

    console.log(newMillionaire);
    localStorage.setItem('millionaire', JSON.stringify(newMillionaire));

    return { ...state, millionaire: newMillionaire };
  } else throw new Error('no matching action type');
};

export default reducer;
