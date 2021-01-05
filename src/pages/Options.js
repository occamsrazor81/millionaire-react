import React from 'react';
import { Link } from 'react-router-dom';

const Options = () => {
  return (
    <main className='options-main'>
      <h2>Options</h2>
      <ul className='options-list'>
        <li className='single-option'>
          <Link to='/question_list'>edit questions</Link>
        </li>
        <li className='single-option'>
          <Link to='/'>change language</Link>
        </li>
      </ul>
    </main>
  );
};

export default Options;
