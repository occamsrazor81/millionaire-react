import React from 'react';
import { useGlobalContext } from '../context';

const Highscores = () => {
  const { chosenHighscores, dispatch } = useGlobalContext();

  const [selectDifficulty, setSelectDifficulty] = React.useState('easy');

  const handleSelectChange = (e) => {
    setSelectDifficulty(e.target.value);
    dispatch({ type: 'DIFFICULTY_HIGHSCORE', payload: e.target.value });
  };

  React.useEffect(() => {
    dispatch({ type: 'DIFFICULTY_HIGHSCORE', payload: selectDifficulty });
  }, [dispatch, selectDifficulty]);

  return (
    <main className='highscore-main'>
      <h2>Highscores</h2>
      <div className='select-div'>
        <select name='difficulty' id='difficulty' onChange={handleSelectChange}>
          <option value='easy'>easy</option>
          <option value='medium'>medium</option>
          <option value='hard'>hard</option>
          <option value='increasing'>increasing</option>
        </select>
      </div>
      <table className='highscore-table'>
        <thead>
          <tr className='table-row'>
            <th className='table-head'>Username</th>
            <th className='table-head'>Score</th>
          </tr>
        </thead>
        <tbody>
          {chosenHighscores.map((hs, index) => {
            return (
              <tr
                key={index}
                className={
                  index > 2
                    ? 'table-row'
                    : index === 2
                    ? 'table-row table-bronze'
                    : index === 1
                    ? 'table-row table-silver'
                    : 'table-row table-gold'
                }
              >
                <td className='table-data'>{hs.username}</td>
                <td className='table-data'>{hs.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default Highscores;
