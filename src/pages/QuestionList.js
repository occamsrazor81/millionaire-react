import React from 'react';
import { useGlobalContext } from '../context';
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineAppstoreAdd,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const { millionaire } = useGlobalContext();
  return (
    <main className='question-list-main'>
      <h2>All questions</h2>
      <div className='add-question-div'>
        <Link to='/add_question'>
          <AiOutlineAppstoreAdd className='add-question-icon' />
        </Link>
      </div>
      <table className='millionaire-table'>
        <thead>
          <tr className='head-row'>
            <th>id</th>
            <th>category</th>
            <th>difficulty</th>
            <th>question</th>
            <th>answers</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody>
          {millionaire.map((singleMillionaire) => {
            const {
              id,
              category,
              difficulty,
              question,
              answers,
              correct,
              // fifty_fifty,
              // ask_the_audience,
              // phone_a_friend,
            } = singleMillionaire;
            return (
              <tr key={id} className='data-row'>
                <td className='millionaire-id'>{id}</td>
                <td className='millionaire-category'>{category}</td>
                <td className='millionaire-difficulty'>{difficulty}</td>
                <td className='millionaire-question'>{question}</td>
                <td className='millionaire-answers'>
                  <ul>
                    {answers.map((answer, index) => {
                      return (
                        <li
                          key={index}
                          style={
                            answer === correct
                              ? { color: 'rgb(31, 180, 31)', fontWeight: '600' }
                              : { color: 'white', fontWeight: '400' }
                          }
                        >
                          {answer}
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td className='millionaire-options'>
                  <ul>
                    <li className='millionaire-option-edit'>
                      <Link to={'/edit_question/' + id}>
                        <AiOutlineEdit className='millionaire-option-icon-edit' />
                      </Link>
                    </li>
                    <li className='millionaire-option-delete'>
                      <Link to='/'>
                        <AiOutlineDelete className='millionaire-option-icon-delete' />
                      </Link>
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default QuestionList;
