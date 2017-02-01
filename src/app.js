import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { List, Map } from 'immutable';

import reducer from './reducer';
import { TodoList } from './containers';

import styles from './app.css'

const store = createStore(reducer);

render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('app')
);