import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Counter from './demo/Counter/Counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

function reducer(state = { value: 0 }, action) {


  if (action.type === 'CHANGE_VALUE') {
    return {
      ...state,
      value: state.value + 1
    }
  }
  if (action.type === 'SEND_MESSAGE') {
    return {
      ...state,
      message: action.message
    }
  }

  return state;

}





ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

