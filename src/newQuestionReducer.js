const newQuestionReducer = (state, action) => {
  if (action.type === 'CATEGORY_CHANGE') {
    return { ...state, category: action.payload };
  } else if (action.type === 'DIFFICULTY_CHANGE') {
    return { ...state, difficulty: action.payload };
  } else if (action.type === 'QUESTION_CHANGE') {
    return { ...state, question: action.payload };
  } else if (action.type === 'ANSWER_CHANGE') {
    let ansIndex = action.payload.index;
    let newAnswers = state.answers;
    newAnswers[ansIndex] = action.payload.value;
    return { ...state, answers: newAnswers };
  } else if (action.type === 'CORRECT_CHANGE') {
    let correct = state.answers[action.payload];
    return { ...state, correct: correct, correctIndex: action.payload };
  } else if (action.type === 'PERCENT_CHANGE') {
    let percIndex = action.payload.index;
    let newPercents = state.ask_the_audience;
    newPercents[percIndex] = action.payload.percent;
    return { ...state, ask_the_audience: newPercents };
  } else if (action.type === 'PHONE_CHANGE') {
    return { ...state, phone_a_friend: action.payload };
  } else if (action.type === 'SUBMIT') {
    if (
      state.category &&
      state.difficulty &&
      state.question &&
      !state.answers.includes('') &&
      state.correct &&
      !state.ask_the_audience.includes('') &&
      state.phone_a_friend
    ) {
      let ask_the_audience_ints = state.ask_the_audience.map((ask) =>
        parseInt(ask)
      );
      let sumAudience = ask_the_audience_ints.reduce(
        (first, second) => first + second,
        0
      );
      if (sumAudience === 100) {
        // let new_audience = state.ask_the_audience.map((ask) => ask + '%');
        let randIndex = Math.floor(Math.random() * 4);
        while (randIndex === state.correctIndex)
          randIndex = Math.floor(Math.random() * 4);

        let new_fifty_fifty = [state.correct, state.answers[randIndex]];
        return {
          ...state,
          // ask_the_audience: new_audience,
          fifty_fifty: new_fifty_fifty,
          flag: true,
        };
      } else return { ...state };
    } else return { ...state };
  } else if (action.type === 'DEFLAG') {
    return {
      ...state,
      category: 'common knowledge',
      difficulty: 'easy',
      question: '',
      answers: ['', '', '', ''],
      correct: '',
      correctIndex: null,
      fifty_fifty: ['', ''],
      ask_the_audience: ['', '', '', ''],
      phone_a_friend: '',
      flag: false,
    };
  } else if (action.type === 'EDIT_QUESTION') {
    const {
      category,
      difficulty,
      question,
      answers,
      ask_the_audience,
      phone_a_friend,
      fifty_fifty,
      correct,
    } = action.payload;

    let corrIndex = null;
    for (let i = 0; i < answers.length; ++i)
      if (answers[i] === correct) corrIndex = i;

    let ask_the_audience_ints = ask_the_audience.map((ask) => parseInt(ask));

    return {
      ...state,
      category,
      difficulty,
      question,
      answers,
      correct,
      correctIndex: corrIndex,
      fifty_fifty,
      ask_the_audience: ask_the_audience_ints,
      phone_a_friend,
      flag: false,
    };
  } else {
    throw new Error('no action found');
  }
};

export default newQuestionReducer;
